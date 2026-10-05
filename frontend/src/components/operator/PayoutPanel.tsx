import { useEffect, useState } from "react";
import { getOperatorPayouts } from "../../services/operatorService";

export default function PayoutPanel() {
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    getOperatorPayouts().then(setPayouts).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Payouts</h2>

      {payouts.length === 0 && <p>No payouts found.</p>}

      {payouts.map(p => (
        <div key={p.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>Payout #{p.id}</strong></p>
          <p>Worker: {p.workerName}</p>
          <p>Amount: ${p.amount}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </section>
  );
}