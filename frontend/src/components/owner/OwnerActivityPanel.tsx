import { useEffect, useState } from "react";
import { getOwnerActivity } from "../../services/ownerService";

export default function OwnerActivityPanel() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    getOwnerActivity().then(setLogs).catch(console.error);
  }, []);

  return (
    <section>
      <h2>System Activity</h2>

      {logs.length === 0 && <p>No activity yet.</p>}

      {logs.map(log => (
        <div key={log.id} style={{
          borderBottom: "1px solid #ccc",
          padding: "5px"
        }}>
          <p><strong>{log.action}</strong></p>
          <p>{log.details}</p>
          <p><small>{log.createdAt}</small></p>
        </div>
      ))}
    </section>
  );
}