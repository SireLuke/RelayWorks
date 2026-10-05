import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.signup(req.body);
      res.json({ message: "User created", user });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}