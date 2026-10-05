import { useEffect, useState } from "react";
import { getClientInvoices } from "../../services/clientService";

export default function InvoicePanel() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    getClientInvoices().then(setInvoices).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Invoices</h2>

      {invoices.length === 0 && <p>No invoices found.</p>}

      {invoices.map(inv => (
        <div key={inv.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Invoice #{inv.id}</strong></p>
          <p>Amount: ${inv.amount}</p>
          <p>Status: {inv.status}</p>
          <p>Date: {inv.createdAt}</p>
        </div>
      ))}
    </section>
  );
}