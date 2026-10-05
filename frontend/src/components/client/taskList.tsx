import { useEffect, useState } from "react";
import { getClientTasks } from "../../services/clientService";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getClientTasks().then(setTasks).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Tasks</h2>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map(task => (
        <div key={task.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{task.title}</strong></p>
          <p>Status: {task.status}</p>
          <p>Worker: {task.workerName || "Unassigned"}</p>
          <p>Deadline: {task.deadline}</p>
        </div>
      ))}
    </section>
  );
}