import { useEffect, useState } from "react";
import { getOperatorClients } from "../../services/operatorService";

export default function ClientPanel() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    getOperatorClients().then(setClients).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Clients</h2>

      {clients.length === 0 && <p>No clients found.</p>}

      {clients.map(c => (
        <div key={c.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>{c.name}</strong></p>
          <p>Active Projects: {c.activeProjects}</p>
          <p>Total Spent: ${c.totalSpent}</p>
        </div>
      ))}
    </section>
  );
}