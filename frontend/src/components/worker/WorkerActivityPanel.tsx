import { useEffect, useState } from "react";
import { getWorkerActivity } from "../../services/workerService";

export default function WorkerActivityPanel() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    getWorkerActivity().then(setLogs).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Activity Log</h2>

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