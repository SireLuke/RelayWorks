import { Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async assign(req: Request, res: Response) {
    try {
      const { taskId, workerId } = req.body;
      const task = await TaskService.assignTask(taskId, workerId);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async submit(req: Request, res: Response) {
    try {
      const { taskId, submissionText } = req.body;
      const task = await TaskService.submitTask(taskId, submissionText);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async review(req: Request, res: Response) {
    try {
      const { taskId, reviewerId, status } = req.body;
      const task = await TaskService.reviewTask(taskId, reviewerId, status);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}