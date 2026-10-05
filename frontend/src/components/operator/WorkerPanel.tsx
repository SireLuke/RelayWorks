import { useEffect, useState } from "react";
import { getOperatorWorkers } from "../../services/operatorService";

export default function WorkerPanel() {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    getOperatorWorkers().then(setWorkers).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Workers</h2>

      {workers.length === 0 && <p>No workers found.</p>}

      {workers.map(w => (
        <div key={w.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>{w.name}</strong></p>
          <p>Status: {w.status}</p>
          <p>Skills: {w.skills?.join(", ")}</p>
        </div>
      ))}
    </section>
  );
}