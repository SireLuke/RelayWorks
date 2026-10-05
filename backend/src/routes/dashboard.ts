// ===============================
// backend/src/routes/dashboard.ts
// ===============================
import { Router } from "express";
import * as ownerController from "../controllers/ownerController";

const router = Router();

// OWNER DASHBOARD (multi-operator, isolated)
router.get("/owner", ownerController.getDashboard);

export default router;


// =====================================
// backend/src/controllers/ownerController.ts
// =====================================
import { Request, Response } from "express";
import * as ownerService from "../services/ownerService";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    // Assuming req.user.operatorId is set by auth middleware
    const operatorId = (req as any).user?.operatorId;

    if (!operatorId) {
      return res.status(401).json({ error: "Operator not authenticated" });
    }

    const data = await ownerService.getDashboardData(operatorId);
    res.json(data);
  } catch (err) {
    console.error("Owner Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load owner dashboard" });
  }
};


// ==================================
// backend/src/services/ownerService.ts
// ==================================
import { prisma } from "../prismaClient";

// Assumed schema:
// Payment: { id, operatorId, amount, createdAt }
// Payout: { id, operatorId, amount, createdAt }
// Client: { id, operatorId, ... }
// Worker: { id, operatorId, ... }
// Task: { id, operatorId, status, ... }

export async function getDashboardData(operatorId: string) {
  // Total revenue = sum of all client payments for this operator
  const paymentsAgg = await prisma.payment.aggregate({
    where: { operatorId },
    _sum: { amount: true },
  });
  const totalRevenue = paymentsAgg._sum.amount || 0;

  // Total worker payouts
  const payoutsAgg = await prisma.payout.aggregate({
    where: { operatorId },
    _sum: { amount: true },
  });
  const workerPayouts = payoutsAgg._sum.amount || 0;

  // Platform fees + company margin:
  // Here we assume:
  // - platformFeePercent = 0.20 (20%)
  // - companyMarginPercent = 0.30 (30%)
  // You can adjust these later or store them in a config table.
  const platformFeePercent = 0.2;
  const companyMarginPercent = 0.3;

  const platformFees = totalRevenue * platformFeePercent;
  const companyMargin = totalRevenue * companyMarginPercent;

  // Active clients
  const activeClients = await prisma.client.count({
    where: { operatorId },
  });

  // Active workers
  const activeWorkers = await prisma.worker.count({
    where: { operatorId },
  });

  // Completed tasks
  const completedTasks = await prisma.task.count({
    where: { operatorId, status: "COMPLETED" },
  });

  return {
    totalRevenue,
    platformFees,
    companyMargin,
    workerPayouts,
    activeClients,
    activeWorkers,
    completedTasks,
  };
}


// ==========================
// backend/src/prismaClient.ts
// (if you don't already have this)
// ==========================
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


// =======================
// backend/src/server.ts
// (add the dashboard routes wiring)
// =======================
import express from "express";
import dashboardRoutes from "./routes/dashboard";

const app = express();

// ... your existing middleware, JSON parsing, auth, etc.

// Attach dashboard routes
app.use("/dashboard", dashboardRoutes);

// ... your existing error handlers, listen(), etc.

export default app;