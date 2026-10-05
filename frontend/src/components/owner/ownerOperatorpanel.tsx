import { useEffect, useState } from "react";
import { getOwnerOperators } from "../../services/ownerService";

export default function OwnerOperatorPanel() {
  const [operators, setOperators] = useState<any[]>([]);

  useEffect(() => {
    getOwnerOperators().then(setOperators).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Operators</h2>

      {operators.length === 0 && <p>No operators found.</p>}

      {operators.map(op => (
        <div key={op.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>{op.name}</strong></p>
          <p>Active Clients: {op.activeClients}</p>
          <p>Active Workers: {op.activeWorkers}</p>
          <p>Tasks Managed: {op.tasksManaged}</p>
        </div>
      ))}
    </section>
  );
}