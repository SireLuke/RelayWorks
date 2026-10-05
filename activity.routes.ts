import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import { ActivityController } from "./activity.controller";

const router = Router();

router.get("/me", authMiddleware, ActivityController.myLogs);

router.get(
  "/all",
  authMiddleware,
  requireRole(["OWNER"]),
  ActivityController.allLogs
);

export default router;