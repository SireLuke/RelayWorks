import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import { SettingsController } from "./settings.controller";

const router = Router();

router.get(
  "/all",
  authMiddleware,
  requireRole(["OWNER"]),
  SettingsController.all
);

router.get(
  "/:key",
  authMiddleware,
  requireRole(["OWNER", "OPERATOR"]),
  SettingsController.get
);

router.post(
  "/set",
  authMiddleware,
  requireRole(["OWNER"]),
  SettingsController.set
);

export default router;