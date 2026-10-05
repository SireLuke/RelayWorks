import { Router } from "express";
import * as paymentController from "../controllers/paymentController";

const router = Router();

// OWNER: calculate splits for a task
router.post("/calculate", paymentController.calculateSplits);

// OWNER: finalize payout for a task
router.post("/payout", paymentController.finalizePayout);

export default router;