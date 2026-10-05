import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import { ProfileController } from "./profile.controller";

const router = Router();

router.get("/me", authMiddleware, ProfileController.me);
router.post("/update", authMiddleware, ProfileController.update);
router.post("/change-password", authMiddleware, ProfileController.changePassword);

router.post(
  "/skills",
  authMiddleware,
  requireRole(["WORKER"]),
  ProfileController.updateSkills
);

router.post(
  "/settings",
  authMiddleware,
  requireRole(["OPERATOR"]),
  ProfileController.updateSettings
);

export default router;