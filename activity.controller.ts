import { Request, Response } from "express";
import { ActivityService } from "./activity.service";

export class ActivityController {
  static async myLogs(req: any, res: Response) {
    const logs = await ActivityService.getUserLogs(req.user.id);
    res.json(logs);
  }

  static async allLogs(req: any, res: Response) {
    const logs = await ActivityService.getAllLogs();
    res.json(logs);
  }
}