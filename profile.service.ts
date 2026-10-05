import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";

export class ProfileService {
  static async getProfile(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  static async updateProfile(userId: string, data: any) {
    return prisma.user.update({
      where: { id: userId },
      data
    });
  }

  static async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new Error("Old password incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);

    return prisma.user.update({
      where: { id: userId },
      data: { password: hashed }
    });
  }

  static async updateSkills(userId: string, skills: string[]) {
    return prisma.user.update({
      where: { id: userId },
      data: { skills }
    });
  }

  static async updateSettings(userId: string, settings: any) {
    return prisma.user.update({
      where: { id: userId },
      data: { settings }
    });
  }
}