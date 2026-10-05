import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

export class DashboardController {
  static async owner(req: Request, res: Response) {
    const data = await DashboardService.ownerOverview();
    res.json(data);
  }

  static async operator(req: Request, res: Response) {
    const data = await DashboardService.operatorOverview(req.user!.id);
    res.json(data);
  }

  static async client(req: Request, res: Response) {
    const data = await DashboardService.clientOverview(req.user!.id);
    res.json(data);
  }

  static async worker(req: Request, res: Response) {
    const data = await DashboardService.workerOverview(req.user!.id);
    res.json(data);
  }

  static async reviewer(req: Request, res: Response) {
    const data = await DashboardService.reviewerOverview(req.user!.id);
    res.json(data);
  }
}