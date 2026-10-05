import { Request, Response } from "express";
import { ProfileService } from "./profile.service";

export class ProfileController {
  static async me(req: any, res: Response) {
    const profile = await ProfileService.getProfile(req.user.id);
    res.json(profile);
  }

  static async update(req: any, res: Response) {
    const updated = await ProfileService.updateProfile(req.user.id, req.body);
    res.json(updated);
  }

  static async changePassword(req: any, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const updated = await ProfileService.changePassword(req.user.id, oldPassword, newPassword);
    res.json(updated);
  }

  static async updateSkills(req: any, res: Response) {
    const { skills } = req.body;
    const updated = await ProfileService.updateSkills(req.user.id, skills);
    res.json(updated);
  }

  static async updateSettings(req: any, res: Response) {
    const { settings } = req.body;
    const updated = await ProfileService.updateSettings(req.user.id, settings);
    res.json(updated);
  }
}