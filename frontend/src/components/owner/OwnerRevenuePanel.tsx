import { useEffect, useState } from "react";
import { getOwnerRevenue } from "../../services/ownerService";

export default function OwnerRevenuePanel() {
  const [rev, setRev] = useState<any>(null);

  useEffect(() => {
    getOwnerRevenue().then(setRev).catch(console.error);
  }, []);

  if (!rev) return <p>Loading revenue...</p>;

  return (
    <section>
      <h2>Revenue Overview</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        background: "#fafafa"
      }}>
        <p><strong>Total Revenue:</strong> ${rev.total}</p>
        <p><strong>Platform Fees:</strong> ${rev.fees}</p>
        <p><strong>Payouts:</strong> ${rev.payouts}</p>
        <p><strong>Net Profit:</strong> ${rev.net}</p>
      </div>
    </section>
  );
}