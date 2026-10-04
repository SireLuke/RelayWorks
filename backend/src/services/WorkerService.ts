import { Worker } from '../models/Worker';

export class WorkerService {
  private static workers: Worker[] = [];

  static listWorkers(): Worker[] {
    return this.workers;
  }

  static createWorker(data: { name: string; email: string; skills: string[]; payoutRate: number }): Worker {
    const newWorker: Worker = {
      id: (this.workers.length + 1).toString(),
      name: data.name,
      email: data.email,
      skills: data.skills,
      payoutRate: data.payoutRate,
      active: true,
      createdAt: new Date()
    };

    this.workers.push(newWorker);
    return newWorker;
  }

  static getWorkerById(id: string): Worker | undefined {
    return this.workers.find(worker => worker.id === id);
  }

  static updateWorker(id: string, updates: Partial<Worker>): Worker | undefined {
    const worker = this.getWorkerById(id);
    if (!worker) return undefined;

    Object.assign(worker, updates);
    return worker;
  }
}
Add WorkerService with basic in-memory worker logic
