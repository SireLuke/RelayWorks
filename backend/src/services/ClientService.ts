import { Client } from '../models/Client';

export class ClientService {
  private static clients: Client[] = [];

  static listClients(): Client[] {
    return this.clients;
  }

  static createClient(data: { name: string; email: string; companyName?: string }): Client {
    const newClient: Client = {
      id: (this.clients.length + 1).toString(),
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      createdAt: new Date()
    };

    this.clients.push(newClient);
    return newClient;
  }

  static getClientById(id: string): Client | undefined {
    return this.clients.find(client => client.id === id);
  }

  static updateClient(id: string, updates: Partial<Client>): Client | undefined {
    const client = this.getClientById(id);
    if (!client) return undefined;

    Object.assign(client, updates);
    return client;
  }
}
