import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

export class ClientController {
  static list(req: Request, res: Response) {
    const clients = ClientService.listClients();
    res.json(clients);
  }

  static create(req: Request, res: Response) {
    const { name, email, companyName } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newClient = ClientService.createClient({ name, email, companyName });
    res.json(newClient);
  }
}
Add ClientController for listing and creating clients
