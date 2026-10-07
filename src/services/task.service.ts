import { prisma } from "../prismaClient";
import { TaskStatus } from "@prisma/client";

// CREATE TASK
export async function createTaskService(operatorId: string, data: {
  title: string;
  description: string;
  payoutAmount: number;
}) {
  return prisma.task.create({
    data: {
      operatorId,
      title: data.title,
      description: data.description,
      payoutAmount: data.payoutAmount,
      status: TaskStatus.UNASSIGNED
    }
  });
}

// ASSIGN TASK
export async function assignTaskService(taskId: string, workerId: string) {
  return prisma.task.update({
    where: { id: taskId },
    data: {
      workerId,
      status: TaskStatus.ASSIGNED
    }
  });
}

// UPDATE STATUS
export async function updateTaskStatusService(taskId: string, status: TaskStatus) {
  return prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
}

// LIST TASKS (role-based)
export async function listTasksService(user: {
  id: string;
  role: string;
  operatorId: string;
}) {
  switch (user.role) {
    case "OWNER":
    case "OPERATOR":
      return prisma.task.findMany({
        where: { operatorId: user.operatorId }
      });

    case "WORKER":
      return prisma.task.findMany({
        where: { workerId: user.id }
      });

    case "REVIEWER":
      return prisma.task.findMany({
        where: { operatorId: user.operatorId }
      });

    default:
      return [];
  }
}

// GET SINGLE TASK
export async function getTaskByIdService(taskId: string) {
  return prisma.task.findUnique({
    where: { id: taskId },
    include: {
      worker: true,
      review: true
    }
  });
}
