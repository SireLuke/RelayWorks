import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
        linkedClientId: user.linkedClientId,
        linkedWorkerId: user.linkedWorkerId
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
  }
}
