import { Router } from "express";
import * as workerController from "../controllers/workerController";

const router = Router();

// WORKER DASHBOARD (multi-operator)
router.get("/worker", workerController.getWorkerDashboard);

export default router;