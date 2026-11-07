import { Request, Response } from "express";
import { getCandidateTargetFloat, getCurrentRamsAvailability, ingestRamsAvailability, RamsAvailabilityInput } from "../policy/rams";

export async function submitRamsAvailability(req: Request, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Authentication required" });
  if (user.role !== "OWNER" && user.role !== "OPERATOR") return res.status(403).json({ error: "Only an owner or operator may submit a RAMS observation" });
  try {
    const input = req.body as RamsAvailabilityInput;
    const result = await ingestRamsAvailability(user.operatorId, user.id, input);
    return res.status(result.duplicate ? 200 : 201).json({
      ...result,
      trustLevel: "operator_attested",
      issuanceAuthorized: false,
      note: "This endpoint records an authenticated operator-attested observation. It is not yet a signed or independently verified RAMS connector."
    });
  } catch (error) {
    const statusCode = typeof error === "object" && error !== null && "statusCode" in error
      ? Number((error as { statusCode: unknown }).statusCode) : 500;
    if (statusCode >= 400 && statusCode < 500) return res.status(statusCode).json({ error: (error as Error).message });
    console.error("RAMS observation ingestion failed", error);
    return res.status(503).json({ error: "Unable to record RAMS observation; verify database and RAMS configuration" });
  }
}

export async function currentRamsAvailability(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Authentication required" });
  try {
    const result = await getCurrentRamsAvailability(req.user.operatorId);
    return res.json({ ...result, trustLevel: result.available ? "operator_attested" : "unavailable", issuanceAuthorized: false });
  } catch (error) {
    console.error("RAMS availability read failed", error);
    return res.status(503).json({ error: "Unable to read RAMS availability" });
  }
}

export async function candidateTargetFloat(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Authentication required" });
  const population = Number(req.query.population);
  if (typeof req.query.population !== "string" || !Number.isFinite(population) || population < 0) {
    return res.status(400).json({ error: "population query parameter must be a non-negative finite number" });
  }
  try {
    const result = await getCandidateTargetFloat(req.user.operatorId, population);
    return res.json(result);
  } catch (error) {
    console.error("PAR candidate target calculation failed", error);
    return res.status(503).json({ error: "Unable to calculate candidate target; verify RAMS configuration" });
  }
}
