import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { NotificationController } from "./notification.controller";

const router = Router();

router.get("/", authMiddleware, NotificationController.list);
router.post("/read", authMiddleware, NotificationController.markRead);

export default router;