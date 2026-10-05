import { Worker } from '../models/Worker';
import { prisma } from "../prismaClient";

export async function getWorkerDashboard(operatorId: string, workerId: string) {
  // Assigned tasks
  const assignedTasks = await prisma.task.count({
    where: { operatorId, workerId, status: "ASSIGNED" },
  });

  // Tasks in progress
  const inProgressTasks = await prisma.task.count({
    where: { operatorId, workerId, status: "IN_PROGRESS" },
  });

  // Completed tasks
  const completedTasks = await prisma.task.count({
    where: { operatorId, workerId, status: "COMPLETED" },
  });

  // Total payout earned
  const totalPayout = await prisma.task.aggregate({
    where: { operatorId, workerId, status: "COMPLETED" },
    _sum: { payoutAmount: true },
  });

  // Tasks completed today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasksCompletedToday = await prisma.task.count({
    where: {
      operatorId,
      workerId,
      status: "COMPLETED",
      completedAt: { gte: today },
    },
  });

  // Worker performance score
  const workerScore = completedTasks + tasksCompletedToday;

  return {
    assignedTasks,
    inProgressTasks,
    completedTasks,
    tasksCompletedToday,
    totalPayout: totalPayout._sum.payoutAmount || 0,
    workerScore,
  };
}
export class WorkerService {
  private static workers: Worker[] = [];

  static listWorkers(): Worker[] {
    return this.workers;
  }

  static createWorker(data: { name: string; email: string; skills: string[]; payoutRate: number }): Worker {
    const newWorker: Worker = {
      id: (this.workers.length + 1).toString(),
      name: data.name,
      email: data.email,
      skills: data.skills,
      payoutRate: data.payoutRate,
      active: true,
      createdAt: new Date()
    };

    this.workers.push(newWorker);
    return newWorker;
  }

  static getWorkerById(id: string): Worker | undefined {
    return this.workers.find(worker => worker.id === id);
  }

  static updateWorker(id: string, updates: Partial<Worker>): Worker | undefined {
    const worker = this.getWorkerById(id);
    if (!worker) return undefined;

    Object.assign(worker, updates);
    return worker;
  }
}
Add WorkerService with basic in-memory worker logic
