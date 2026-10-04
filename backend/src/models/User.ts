export type Role = 'admin' | 'client' | 'worker';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  linkedClientId?: string;
  linkedWorkerId?: string;
}
