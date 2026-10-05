import { Router } from "express";
import * as reviewerController from "../controllers/reviewerController";

const router = Router();

// REVIEWER DASHBOARD (multi-operator)
router.get("/reviewer", reviewerController.getReviewerDashboard);

export default router;