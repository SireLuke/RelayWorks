CREATE TABLE "ResourceAvailabilityObservation" (
  "id" TEXT NOT NULL,
  "operatorId" TEXT NOT NULL,
  "sourceSystem" TEXT NOT NULL,
  "sourceRecordId" TEXT NOT NULL,
  "sourceVersion" TEXT,
  "rawAvailability" DOUBLE PRECISION NOT NULL,
  "smoothedAvailability" DOUBLE PRECISION NOT NULL,
  "smoothingAlpha" DOUBLE PRECISION NOT NULL,
  "observedAt" TIMESTAMP(3) NOT NULL,
  "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedById" TEXT NOT NULL,
  "payloadHash" TEXT NOT NULL,
  "notes" TEXT,
  CONSTRAINT "ResourceAvailabilityObservation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResourceAvailabilityObservation_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "ResourceAvailabilityObservation_sourceSystem_sourceRecordId_key"
  ON "ResourceAvailabilityObservation"("sourceSystem", "sourceRecordId");
CREATE INDEX "ResourceAvailabilityObservation_operatorId_observedAt_idx"
  ON "ResourceAvailabilityObservation"("operatorId", "observedAt");
