import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // replace in production

export interface AuthUser {
  id: string;
  role: "OWNER" | "REVIEWER" | "WORKER";
  operatorId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    (req as any).user = decoded;

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};