import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: wrong role" });
    }

    next();
  };
};