import { Request, Response } from "express";
import * as reviewerService from "../services/reviewerService";

export const getReviewerDashboard = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;

    if (!operatorId) {
      return res.status(401).json({ error: "Operator not authenticated" });
    }

    const data = await reviewerService.getReviewerDashboard(operatorId);
    res.json(data);
  } catch (err) {
    console.error("Reviewer Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load reviewer dashboard" });
  }
};