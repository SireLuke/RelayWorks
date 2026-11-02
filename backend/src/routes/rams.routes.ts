import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { submitRamsAvailability, currentRamsAvailability } from "../controllers/rams.controller";

const router = Router();
router.post("/resource-availability", requireAuth, requireRole(["OWNER", "OPERATOR"]), submitRamsAvailability);
router.get("/resource-availability/current", requireAuth, currentRamsAvailability);
export default router;
