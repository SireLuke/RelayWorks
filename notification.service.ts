import { prisma } from "../../config/db";

export class NotificationService {
  static async createNotification(data: any) {
    return prisma.notification.create({ data });
  }

  static async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  static async markRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    });
  }
}