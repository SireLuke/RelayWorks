import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

export class NotificationController {
  static async list(req: any, res: Response) {
    const notifications = await NotificationService.getNotifications(req.user.id);
    res.json(notifications);
  }

  static async markRead(req: any, res: Response) {
    const { id } = req.body;
    const updated = await NotificationService.markRead(id);
    res.json(updated);
  }
}