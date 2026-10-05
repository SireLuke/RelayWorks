export interface CreateInvoiceDTO {
  clientId: string;
  operatorId: string;
  amount: number;
  currency: string;
}

export interface RecordPaymentDTO {
  invoiceId: string;
  amount: number;
}

export interface CreatePayoutDTO {
  workerId: string;
  operatorId: string;
  amount: number;
  currency: string;
}