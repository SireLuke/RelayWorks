CREATE TYPE "Role" AS ENUM ('OWNER', 'REVIEWER', 'WORKER', 'OPERATOR');
CREATE TYPE "TaskStatus" AS ENUM ('UNASSIGNED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'PAID');
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'CHANGES_REQUESTED');
CREATE TYPE "PayoutRecordStatus" AS ENUM ('RECORDED', 'RECONCILIATION_REQUIRED');

CREATE TABLE "Operator" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Owner" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Reviewer" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Reviewer_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Worker" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Task" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL,
  "payoutAmount" DOUBLE PRECISION NOT NULL, "workerId" TEXT, "status" "TaskStatus" NOT NULL DEFAULT 'UNASSIGNED',
  "completedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "TaskReview" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "reviewerId" TEXT NOT NULL, "taskId" TEXT NOT NULL,
  "status" "ReviewStatus" NOT NULL, "reason" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TaskReview_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "PayoutRecord" (
  "id" TEXT NOT NULL, "operatorId" TEXT NOT NULL, "taskId" TEXT NOT NULL, "amount" DECIMAL(20,8) NOT NULL,
  "settlementReference" TEXT NOT NULL, "status" "PayoutRecordStatus" NOT NULL DEFAULT 'RECONCILIATION_REQUIRED',
  "recordedById" TEXT NOT NULL, "note" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PayoutRecord_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
CREATE UNIQUE INDEX "Reviewer_email_key" ON "Reviewer"("email");
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");
CREATE UNIQUE INDEX "TaskReview_taskId_key" ON "TaskReview"("taskId");
CREATE UNIQUE INDEX "PayoutRecord_taskId_key" ON "PayoutRecord"("taskId");
CREATE UNIQUE INDEX "PayoutRecord_settlementReference_key" ON "PayoutRecord"("settlementReference");
CREATE INDEX "PayoutRecord_operatorId_createdAt_idx" ON "PayoutRecord"("operatorId", "createdAt");

ALTER TABLE "Owner" ADD CONSTRAINT "Owner_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TaskReview" ADD CONSTRAINT "TaskReview_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TaskReview" ADD CONSTRAINT "TaskReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TaskReview" ADD CONSTRAINT "TaskReview_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PayoutRecord" ADD CONSTRAINT "PayoutRecord_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PayoutRecord" ADD CONSTRAINT "PayoutRecord_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
