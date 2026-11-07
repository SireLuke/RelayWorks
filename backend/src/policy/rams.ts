import { createHash } from "node:crypto";
import { prisma } from "../prismaClient";
import { calculateTargetFloat, smoothResourceAvailability } from "./par";

export const RAMS_POLICY = Object.freeze({ normalizedRange: [0, 1] as const, defaultSmoothingAlpha: 0.25, defaultMaxAgeMinutes: 60, futureClockToleranceSeconds: 60, issuanceAuthorizedByAvailability: false });

export interface RamsAvailabilityInput {
  sourceSystem: string;
  sourceRecordId: string;
  availability: number;
  observedAt: string;
  sourceVersion?: string;
  notes?: string;
}

export function ramsConfig(now = new Date()) {
  const alpha = Number(process.env.RAMS_SMOOTHING_ALPHA ?? String(RAMS_POLICY.defaultSmoothingAlpha)); // provisional pilot default; configure explicitly before production
  const maxAgeMinutes = Number(process.env.RAMS_MAX_AGE_MINUTES ?? String(RAMS_POLICY.defaultMaxAgeMinutes));
  if (!Number.isFinite(alpha) || alpha <= 0 || alpha > 1) throw new Error("RAMS_SMOOTHING_ALPHA must be in (0,1]");
  if (!Number.isFinite(maxAgeMinutes) || maxAgeMinutes <= 0) throw new Error("RAMS_MAX_AGE_MINUTES must be positive");
  return { alpha, maxAgeMinutes, now };
}

export function validateRamsAvailability(input: RamsAvailabilityInput, now = new Date()) {
  const errors: string[] = [];
  if (!input || typeof input !== "object") return { valid: false, errors: ["A RAMS observation object is required"], observedAt: new Date(NaN) };
  if (typeof input.sourceSystem !== "string" || !input.sourceSystem.trim() || input.sourceSystem.trim().length > 100) errors.push("sourceSystem is required (max 100 chars)");
  if (typeof input.sourceRecordId !== "string" || !input.sourceRecordId.trim() || input.sourceRecordId.trim().length > 200) errors.push("sourceRecordId is required (max 200 chars)");
  if (!Number.isFinite(input.availability) || input.availability < 0 || input.availability > 1) errors.push("availability must be normalized to [0,1]");
  const observedAt = new Date(input.observedAt);
  if (!input.observedAt || !Number.isFinite(observedAt.getTime())) errors.push("observedAt must be a valid ISO date");
  else if (observedAt.getTime() > now.getTime() + 60_000) errors.push("observedAt cannot be more than 60 seconds in the future");
  if (input.sourceVersion !== undefined && (typeof input.sourceVersion !== "string" || input.sourceVersion.length > 100)) errors.push("sourceVersion must be a string of at most 100 chars");
  if (input.notes !== undefined && (typeof input.notes !== "string" || input.notes.length > 1000)) errors.push("notes must be a string of at most 1000 chars");
  return { valid: errors.length === 0, errors, observedAt };
}

export function hashRamsPayload(input: RamsAvailabilityInput): string {
  const canonical = JSON.stringify({
    sourceSystem: input.sourceSystem.trim(),
    sourceRecordId: input.sourceRecordId.trim(),
    availability: input.availability,
    observedAt: new Date(input.observedAt).toISOString(),
    sourceVersion: input.sourceVersion ?? null,
    notes: input.notes ?? null
  });
  return createHash("sha256").update(canonical).digest("hex");
}

export async function ingestRamsAvailability(operatorId: string, submittedById: string, input: RamsAvailabilityInput) {
  const now = new Date();
  const validation = validateRamsAvailability(input, now);
  if (!validation.valid) {
    const error = new Error(validation.errors.join("; "));
    Object.assign(error, { statusCode: 400 });
    throw error;
  }
  const { alpha } = ramsConfig(now);
  const sourceSystem = input.sourceSystem.trim();
  const sourceRecordId = input.sourceRecordId.trim();
  const payloadHash = hashRamsPayload(input);

  const duplicate = await prisma.resourceAvailabilityObservation.findUnique({
    where: { sourceSystem_sourceRecordId: { sourceSystem, sourceRecordId } }
  });
  if (duplicate) {
    if (duplicate.payloadHash !== payloadHash) {
      const error = new Error("sourceSystem/sourceRecordId was already used for a different payload");
      Object.assign(error, { statusCode: 409 });
      throw error;
    }
    return { observation: duplicate, duplicate: true, smoothedAvailability: duplicate.smoothedAvailability };
  }

  const previous = await prisma.resourceAvailabilityObservation.findFirst({
    where: { operatorId },
    orderBy: [{ observedAt: "desc" }, { receivedAt: "desc" }]
  });
  if (previous && validation.observedAt.getTime() < previous.observedAt.getTime()) {
    const error = new Error("Out-of-order observations are rejected; submit a correction as a new, later observation with explicit provenance");
    Object.assign(error, { statusCode: 409 });
    throw error;
  }

  const smoothedAvailability = previous
    ? smoothResourceAvailability(input.availability, previous.smoothedAvailability, alpha)
    : input.availability;

  const observation = await prisma.resourceAvailabilityObservation.create({
    data: {
      operatorId,
      sourceSystem,
      sourceRecordId,
      sourceVersion: input.sourceVersion?.trim() || null,
      rawAvailability: input.availability,
      smoothedAvailability,
      smoothingAlpha: alpha,
      observedAt: validation.observedAt,
      receivedAt: now,
      submittedById,
      payloadHash,
      notes: input.notes?.trim() || null
    }
  });
  return { observation, duplicate: false, smoothedAvailability };
}

export async function getCurrentRamsAvailability(operatorId: string, now = new Date()) {
  const config = ramsConfig(now);
  const latest = await prisma.resourceAvailabilityObservation.findFirst({
    where: { operatorId },
    orderBy: [{ observedAt: "desc" }, { receivedAt: "desc" }]
  });
  if (!latest) return { available: false as const, reason: "no_observation", observation: null, targetFloat: null };
  const ageMs = now.getTime() - latest.observedAt.getTime();
  if (ageMs < 0 || ageMs > config.maxAgeMinutes * 60_000) {
    return { available: false as const, reason: "stale_observation", observation: latest, ageMs, targetFloat: null };
  }
  return { available: true as const, reason: null, observation: latest, ageMs, resourceAvailability: latest.smoothedAvailability };
}

export async function getCandidateTargetFloat(operatorId: string, population: number) {
  if (!Number.isFinite(population) || population < 0) throw new RangeError("population must be finite and non-negative");
  const current = await getCurrentRamsAvailability(operatorId);
  if (!current.available) return { ...current, population, targetFloat: null, issuanceAuthorized: false };
  return {
    ...current,
    population,
    targetFloat: calculateTargetFloat(population, current.resourceAvailability),
    issuanceAuthorized: false,
    note: "Indicative target only. No PAR is minted or transferred; outstanding supply and issuance approval are not connected."
  };
}
