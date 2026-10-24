import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/login", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const [owner, reviewer, worker] = await Promise.all([
      prisma.owner.findUnique({ where: { email } }),
      prisma.reviewer.findUnique({ where: { email } }),
      prisma.worker.findUnique({ where: { email } })
    ]);

    const account = owner
      ? { id: owner.id, operatorId: owner.operatorId, passwordHash: owner.password, role: "OWNER" as const }
      : reviewer
        ? { id: reviewer.id, operatorId: reviewer.operatorId, passwordHash: reviewer.password, role: "REVIEWER" as const }
        : worker
          ? { id: worker.id, operatorId: worker.operatorId, passwordHash: worker.password, role: "WORKER" as const }
          : null;

    if (!account || !(await bcrypt.compare(password, account.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: account.id, operatorId: account.operatorId, role: account.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: account.id, operatorId: account.operatorId, role: account.role }
    });
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ error: "Unable to log in" });
  }
});

export default router;
