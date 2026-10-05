import { Request, Response, NextFunction } from "express";
import { AuthUser } from "./auth";

export const requireOwner = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as AuthUser | undefined;

  if (!user || user.role !== "OWNER") {
    return res.status(403).json({ error: "Owner role required" });
  }

  next();
};

export const requireReviewer = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as AuthUser | undefined;

  if (!user || user.role !== "REVIEWER") {
    return res.status(403).json({ error: "Reviewer role required" });
  }

  next();
};

export const requireWorker = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as AuthUser | undefined;

  if (!user || user.role !== "WORKER") {
    return res.status(403).json({ error: "Worker role required" });
  }

  next();
};