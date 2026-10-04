import { Request, Response } from 'express';
import { WorkerService } from '../services/WorkerService';

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
