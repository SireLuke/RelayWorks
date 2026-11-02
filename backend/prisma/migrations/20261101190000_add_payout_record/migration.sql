CREATE TYPE "PayoutRecordStatus" AS ENUM ('RECORDED', 'RECONCILIATION_REQUIRED');

CREATE TABLE "PayoutRecord" (
  "id" TEXT NOT NULL,
  "operatorId" TEXT NOT NULL,
  "taskId" TEXT NOT NULL,
  "amount" DECIMAL(20,8) NOT NULL,
  "settlementReference" TEXT NOT NULL,
  "status" "PayoutRecordStatus" NOT NULL DEFAULT 'RECONCILIATION_REQUIRED',
  "recordedById" TEXT NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PayoutRecord_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PayoutRecord_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "PayoutRecord_taskId_key" ON "PayoutRecord"("taskId");
CREATE UNIQUE INDEX "PayoutRecord_settlementReference_key" ON "PayoutRecord"("settlementReference");
CREATE INDEX "PayoutRecord_operatorId_createdAt_idx" ON "PayoutRecord"("operatorId", "createdAt");
