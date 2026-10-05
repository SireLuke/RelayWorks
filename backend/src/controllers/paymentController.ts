import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

export const calculateSplits = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;
    const { taskId, workerPercent, companyPercent, platformPercent } = req.body;

    if (!operatorId) {
      return res.status(401).json({ error: "Operator not authenticated" });
    }

    const splits = await paymentService.calculateSplits(
      operatorId,
      taskId,
      workerPercent,
      companyPercent,
      platformPercent
    );

    res.json(splits);
  } catch (err) {
    console.error("Calculate Splits Error:", err);
    res.status(500).json({ error: "Failed to calculate splits" });
  }
};

export const finalizePayout = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;
    const { taskId } = req.body;

    if (!operatorId) {
      return res.status(401).json({ error: "Operator not authenticated" });
    }

    const result = await paymentService.finalizePayout(operatorId, taskId);
    res.json(result);
  } catch (err) {
    console.error("Finalize Payout Error:", err);
    res.status(500).json({ error: "Failed to finalize payout" });
  }
};