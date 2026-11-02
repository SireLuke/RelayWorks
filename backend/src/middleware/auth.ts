import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AppRole = "OWNER" | "REVIEWER" | "WORKER" | "OPERATOR";

export interface AuthUser {
  id: string;
  role: AppRole;
  operatorId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured and contain at least 32 characters");
  }
  return secret;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  try {
    const decoded = jwt.verify(header.slice(7), getJwtSecret()) as Partial<AuthUser>;
    if (
      !decoded ||
      typeof decoded.id !== "string" ||
      typeof decoded.operatorId !== "string" ||
      !["OWNER", "REVIEWER", "WORKER", "OPERATOR"].includes(String(decoded.role))
    ) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = decoded as AuthUser;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export const authMiddleware = requireAuth;

export function requireRole(roles: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    return next();
  };
}
