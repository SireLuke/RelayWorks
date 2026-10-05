import { prisma } from "../prismaClient";

// OWNER: create task
export async function createTask(operatorId: string, title: string, description: string, payoutAmount: number) {
  return prisma.task.create({
    data: {
      operatorId,
      title,
      description,
      payoutAmount,
      status: "UNASSIGNED",
    },
  });
}

// OWNER: assign worker
export async function assignWorker(operatorId: string, taskId: string, workerId: string) {
  return prisma.task.updateMany({
    where: { id: taskId, operatorId },
    data: { workerId, status: "ASSIGNED" },
  });
}

// WORKER: accept task
export async function acceptTask(workerId: string, taskId: string) {
  return prisma.task.updateMany({
    where: { id: taskId, workerId },
    data: { status: "IN_PROGRESS" },
  });
}

// WORKER: mark in-progress
export async function markInProgress(workerId: string, taskId: string) {
  return prisma.task.updateMany({
    where: { id: taskId, workerId },
    data: { status: "IN_PROGRESS" },
  });
}

// WORKER: complete task
export async function completeTask(workerId: string, taskId: string) {
  return prisma.task.updateMany({
    where: { id: taskId, workerId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });
}

// REVIEWER: approve
export async function approveTask(operatorId: string, reviewerId: string, taskId: string) {
  return prisma.taskReview.create({
    data: {
      operatorId,
      reviewerId,
      taskId,
      status: "APPROVED",
    },
  });
}

// REVIEWER: request changes
export async function requestChanges(operatorId: string, reviewerId: string, taskId: string, reason: string) {
  return prisma.taskReview.create({
    data: {
      operatorId,
      reviewerId,
      taskId,
      status: "CHANGES_REQUESTED",
      reason,
    },
  });
}