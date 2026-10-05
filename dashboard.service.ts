import { prisma } from "../../config/db";

export class DashboardService {
  static async ownerOverview() {
    const operators = await prisma.user.count({ where: { role: "OPERATOR" } });
    const totalFees = await prisma.platformFee.aggregate({ _sum: { amount: true } });

    return {
      operators,
      totalFees: totalFees._sum.amount || 0
    };
  }

  static async operatorOverview(operatorId: string) {
    const tasks = await prisma.task.count({ where: { operatorId } });
    const workers = await prisma.user.count({ where: { role: "WORKER" } });
    const balance = await prisma.operatorBalance.findUnique({ where: { operatorId } });

    return {
      tasks,
      workers,
      balance: balance?.balance || 0
    };
  }

  static async clientOverview(clientId: string) {
    const tasks = await prisma.task.findMany({ where: { clientId } });
    const invoices = await prisma.invoice.findMany({ where: { clientId } });

    return { tasks, invoices };
  }

  static async workerOverview(workerId: string) {
    const tasks = await prisma.task.findMany({ where: { workerId } });
    const payouts = await prisma.payout.findMany({ where: { workerId } });

    return { tasks, payouts };
  }

  static async reviewerOverview(reviewerId: string) {
    const pending = await prisma.task.findMany({
      where: { reviewerId, status: "SUBMITTED" }
    });

    return { pending };
  }
}