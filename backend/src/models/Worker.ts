export interface Worker {
  id: string;
  name: string;
  email: string;
  skills: string[];
  payoutRate: number; // how much the worker earns per task or per hour
  active: boolean;
  createdAt: Date;
}
Add Worker model
