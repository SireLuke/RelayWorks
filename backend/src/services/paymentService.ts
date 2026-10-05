import { prisma } from "../prismaClient";

export async function calculateSplits(
  operatorId: string,
  taskId: string,
  workerPercent: number,
  companyPercent: number,
  platformPercent: number
) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, operatorId, status: "COMPLETED" },
  });

  if (!task) {
    throw new Error("Task not found or not completed");
  }

  const total = task.payoutAmount;

  const workerAmount = (total * workerPercent) / 100;
  const companyAmount = (total * companyPercent) / 100;
  const platformAmount = (total * platformPercent) / 100;

  return {
    total,
    workerAmount,
    companyAmount,
    platformAmount,
  };
}

export async function finalizePayout(operatorId: string, taskId: string) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, operatorId, status: "COMPLETED" },
  });

  if (!task) {
    throw new Error("Task not found or not completed");
  }

  // Here you’d normally integrate with a payment processor.
  // For now, we just mark the task as "PAID" and store payout info.

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      status: "PAID",
    },
  });

  return {
    message: "Payout finalized",
    task: updatedTask,
  };
}