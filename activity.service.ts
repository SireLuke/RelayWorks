import { prisma } from "../../config/db";

export class ActivityService {
  static async log(userId: string, action: string, details?: string) {
    return prisma.activityLog.create({
      data: { userId, action, details }
    });
  }

  static async getUserLogs(userId: string) {
    return prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  static async getAllLogs() {
    return prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
}