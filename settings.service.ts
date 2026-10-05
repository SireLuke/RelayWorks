import { prisma } from "../../config/db";

export class SettingsService {
  static async get(key: string) {
    const setting = await prisma.globalSettings.findUnique({ where: { key } });
    return setting?.value || null;
  }

  static async set(key: string, value: any) {
    return prisma.globalSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  }

  static async getAll() {
    return prisma.globalSettings.findMany();
  }
}