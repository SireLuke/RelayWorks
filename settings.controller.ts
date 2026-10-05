import { Request, Response } from "express";
import { SettingsService } from "./settings.service";

export class SettingsController {
  static async get(req: Request, res: Response) {
    const { key } = req.params;
    const value = await SettingsService.get(key);
    res.json({ key, value });
  }

  static async set(req: Request, res: Response) {
    const { key, value } = req.body;
    const updated = await SettingsService.set(key, value);
    res.json(updated);
  }

  static async all(req: Request, res: Response) {
    const settings = await SettingsService.getAll();
    res.json(settings);
  }
}