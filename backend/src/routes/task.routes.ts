import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import {
  createTask,
  assignTask,
  updateTaskStatus,
  getTasks,
  getTaskById
} from "../controllers/task.controller";

const router = Router();

// CREATE TASK — only OWNER + OPERATOR
router.post(
  "/",
  requireAuth,
  requireRole(["OWNER", "OPERATOR"]),
  createTask
);

// ASSIGN TASK — only OWNER + OPERATOR
router.patch(
  "/:id/assign",
  requireAuth,
  requireRole(["OWNER", "OPERATOR"]),
  assignTask
);

// UPDATE STATUS — worker or operator depending on state
router.patch(
  "/:id/status",
  requireAuth,
  updateTaskStatus
);

// LIST TASKS — role-based filtering happens in controller
router.get(
  "/",
  requireAuth,
  getTasks
);

// GET SINGLE TASK
router.get(
  "/:id",
  requireAuth,
  getTaskById
);

export default router;

export default router;
