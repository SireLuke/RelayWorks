import { Router } from "express";
import { TaskController } from "./task.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

const router = Router();

// Client creates tasks
router.post(
  "/create",
  authMiddleware,
  requireRole(["CLIENT", "OPERATOR"]),
  TaskController.create
);

// Operator assigns tasks
router.post(
  "/assign",
  authMiddleware,
  requireRole(["OPERATOR"]),
  TaskController.assign
);

// Worker submits tasks
router.post(
  "/submit",
  authMiddleware,
  requireRole(["WORKER"]),
  TaskController.submit
);

// Reviewer approves/rejects
router.post(
  "/review",
  authMiddleware,
  requireRole(["REVIEWER", "OPERATOR"]),
  TaskController.review
);

export default router;