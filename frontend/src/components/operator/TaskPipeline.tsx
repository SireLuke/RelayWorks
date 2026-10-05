import { useEffect, useState } from "react";
import { getOperatorTasks } from "../../services/operatorService";

export default function TaskPipeline() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getOperatorTasks().then(setTasks).catch(console.error);
  }, []);

  const columns = ["Assign", "In Progress", "Submitted", "Changes", "Completed"];

  return (
    <section>
      <h2>Task Pipeline</h2>

      <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
        {columns.map(col => (
          <div key={col} style={{
            minWidth: "200px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
            background: "#f7f7f7"
          }}>
            <h3>{col}</h3>

            {tasks
              .filter(t => t.status === col)
              .map(t => (
                <div key={t.id} style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  background: "#fff"
                }}>
                  <p><strong>{t.title}</strong></p>
                  <p>Worker: {t.workerName || "Unassigned"}</p>
                  <p>Deadline: {t.deadline}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}