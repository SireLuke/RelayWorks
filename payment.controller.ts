import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {
  static async createInvoice(req: Request, res: Response) {
    try {
      const invoice = await PaymentService.createInvoice(req.body);
      res.json(invoice);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async recordPayment(req: Request, res: Response) {
    try {
      const { invoiceId, amount } = req.body;
      const payment = await PaymentService.recordPayment(invoiceId, amount);
      res.json(payment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async createPayout(req: Request, res: Response) {
    try {
      const payout = await PaymentService.createPayout(req.body);
      res.json(payout);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async markPayoutSent(req: Request, res: Response) {
    try {
      const { payoutId } = req.body;
      const payout = await PaymentService.markPayoutSent(payoutId);
      res.json(payout);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}