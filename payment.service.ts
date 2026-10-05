import { prisma } from "../../config/db";

export class PaymentService {
  static async createInvoice(data: any) {
    return prisma.invoice.create({ data });
  }

  static async recordPayment(invoiceId: string, amount: number) {
    const payment = await prisma.payment.create({
      data: { invoiceId, amount }
    });

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "PAID" }
    });

    return payment;
  }

  static async createPayout(data: any) {
    return prisma.payout.create({ data });
  }

  static async markPayoutSent(payoutId: string) {
    return prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: "SENT",
        sentAt: new Date()
      }
    });
  }

  static async getOperatorBalance(operatorId: string) {
    return prisma.operatorBalance.findUnique({
      where: { operatorId }
    });
  }
}