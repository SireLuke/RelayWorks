import { useEffect, useState } from "react";
import { getWorkerTasks } from "../../services/workerService";

export default function WorkerTaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getWorkerTasks().then(setTasks).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Your Tasks</h2>

      {tasks.length === 0 && <p>No assigned tasks.</p>}

      {tasks.map(t => (
        <div key={t.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>{t.title}</strong></p>
          <p>Status: {t.status}</p>
          <p>Deadline: {t.deadline}</p>
        </div>
      ))}
    </section>
  );
}