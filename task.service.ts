import { prisma } from "../../config/db";

export class TaskService {
  static async createTask(data: any) {
    return prisma.task.create({ data });
  }

  static async assignTask(taskId: string, workerId: string) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        workerId,
        status: "ASSIGNED"
      }
    });
  }

  static async submitTask(taskId: string, submissionText: string) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        description: submissionText,
        status: "SUBMITTED"
      }
    });
  }

  static async reviewTask(taskId: string, reviewerId: string, status: string) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        reviewerId,
        status
      }
    });
  }

  static async getTasksForOperator(operatorId: string) {
    return prisma.task.findMany({ where: { operatorId } });
  }
}