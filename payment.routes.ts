import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

const router = Router();

// Operator creates invoice
router.post(
  "/invoice",
  authMiddleware,
  requireRole(["OPERATOR"]),
  PaymentController.createInvoice
);

// Operator records payment
router.post(
  "/pay",
  authMiddleware,
  requireRole(["OPERATOR"]),
  PaymentController.recordPayment
);

// Operator creates payout
router.post(
  "/payout",
  authMiddleware,
  requireRole(["OPERATOR"]),
  PaymentController.createPayout
);

// Operator marks payout sent
router.post(
  "/payout/sent",
  authMiddleware,
  requireRole(["OPERATOR"]),
  PaymentController.markPayoutSent
);

export default router;