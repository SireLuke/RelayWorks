import { useEffect, useState } from "react";

export default function OwnerDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard/owner", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Owner Dashboard</h1>

      {!data && <p>Loading...</p>}

      {data && (
        <div>
          <p><strong>Total Operators:</strong> {data.operators}</p>
          <p><strong>Total Platform Fees:</strong> ${data.totalFees}</p>
        </div>
      )}
    </div>
  );
}