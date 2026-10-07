import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// OWNER: create task
router.post("/create", taskController.createTask);

// OWNER: assign worker
router.post("/assign", taskController.assignWorker);

// WORKER: accept task
router.post("/accept", taskController.acceptTask);

// WORKER: mark in-progress
router.post("/progress", taskController.markInProgress);

// WORKER: complete task
router.post("/complete", taskController.completeTask);

// REVIEWER: approve
router.post("/approve", taskController.approveTask);

// REVIEWER: request changes
router.post("/changes", taskController.requestChanges);
router.post("/", requireAuth, createTask);
export default router;
