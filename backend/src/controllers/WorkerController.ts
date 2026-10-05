import { Request, Response } from 'express';
import { WorkerService } from '../services/WorkerService';
import { Request, Response } from "express";
import * as workerService from "../services/workerService";

export const getWorkerDashboard = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;
    const workerId = (req as any).user?.id; // JWT injects worker id

    if (!operatorId || !workerId) {
      return res.status(401).json({ error: "Worker not authenticated" });
    }

    const data = await workerService.getWorkerDashboard(operatorId, workerId);
    res.json(data);
  } catch (err) {
    console.error("Worker Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load worker dashboard" });
  }
};
export class WorkerController {
  static list(req: Request, res: Response) {
    const workers = WorkerService.listWorkers();
    res.json(workers);
  }

  static create(req: Request, res: Response) {
    const { name, email, skills, payoutRate } = req.body;

    if (!name || !email || !skills || payoutRate === undefined) {
      return res.status(400).json({ message: 'Name, email, skills, and payoutRate are required' });
    }

    const newWorker = WorkerService.createWorker({ name, email, skills, payoutRate });
    res.json(newWorker);
  }
}
Add WorkerController for listing and creating workers
