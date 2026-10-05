import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/owner", authMiddleware, requireRole(["OWNER"]), DashboardController.owner);
router.get("/operator", authMiddleware, requireRole(["OPERATOR"]), DashboardController.operator);
router.get("/client", authMiddleware, requireRole(["CLIENT"]), DashboardController.client);
router.get("/worker", authMiddleware, requireRole(["WORKER"]), DashboardController.worker);
router.get("/reviewer", authMiddleware, requireRole(["REVIEWER"]), DashboardController.reviewer);

export default router;