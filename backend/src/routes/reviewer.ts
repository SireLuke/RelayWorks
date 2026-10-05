// ===============================
// backend/src/routes/reviewer.ts
// ===============================
import { Router } from "express";
import * as reviewerController from "../controllers/reviewerController";

const router = Router();

// REVIEWER DASHBOARD (multi-operator)
router.get("/reviewer", reviewerController.getReviewerDashboard);

export default router;


// ==========================================
// backend/src/controllers/reviewerController.ts
// ==========================================
import { Request, Response } from "express";
import * as reviewerService from "../services/reviewerService";

export const getReviewerDashboard = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;

    if (!operatorId) {
      return res.status(401).json({ error: "Operator not authenticated" });
    }

    const data = await reviewerService.getReviewerDashboard(operatorId);
    res.json(data);
  } catch (err) {
    console.error("Reviewer Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load reviewer dashboard" });
  }
};


// ==================================
// backend/src/services/reviewerService.ts
// ==================================
import { prisma } from "../prismaClient";

export async function getReviewerDashboard(operatorId: string) {
  // Pending reviews
  const pendingReviews = await prisma.taskReview.count({
    where: { operatorId, status: "PENDING" },
  });

  // Approved reviews
  const approvedReviews = await prisma.taskReview.count({
    where: { operatorId, status: "APPROVED" },
  });

  // Changes requested
  const changesRequested = await prisma.taskReview.count({
    where: { operatorId, status: "CHANGES_REQUESTED" },
  });

  // Tasks needing review (tasks completed but not reviewed)
  const tasksNeedingReview = await prisma.task.count({
    where: {
      operatorId,
      status: "COMPLETED",
      reviewId: null, // assuming tasks link to reviews
    },
  });

  // Tasks reviewed today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasksReviewedToday = await prisma.taskReview.count({
    where: {
      operatorId,
      createdAt: { gte: today },
    },
  });

  // Reviewer score (simple formula: approved minus changes requested)
  const reviewerScore = approvedReviews - changesRequested;

  return {
    pendingReviews,
    approvedReviews,
    changesRequested,
    tasksNeedingReview,
    tasksReviewedToday,
    reviewerScore,
  };
}


// =======================
// backend/src/server.ts
// (add reviewer routes)
// =======================
import express from "express";
import reviewerRoutes from "./routes/reviewer";

const app = express();

// ... existing middleware, JSON parsing, auth, etc.

app.use("/dashboard", reviewerRoutes);

// ... existing error handlers, listen(), etc.

export default app;