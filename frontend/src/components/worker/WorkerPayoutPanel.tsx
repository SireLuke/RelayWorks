import { useEffect, useState } from "react";
import { getWorkerPayouts } from "../../services/workerService";

export default function WorkerPayoutPanel() {
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    getWorkerPayouts().then(setPayouts).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Payout History</h2>

      {payouts.length === 0 && <p>No payouts yet.</p>}

      {payouts.map(p => (
        <div key={p.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>Payout #{p.id}</strong></p>
          <p>Amount: ${p.amount}</p>
          <p>Status: {p.status}</p>
          <p>Date: {p.createdAt}</p>
        </div>
      ))}
    </section>
  );
}