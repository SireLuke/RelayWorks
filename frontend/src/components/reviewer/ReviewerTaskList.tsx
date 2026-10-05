import { useEffect, useState } from "react";
import { getReviewerTasks } from "../../services/reviewerService";

export default function ReviewerTaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getReviewerTasks().then(setTasks).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Tasks Waiting for Review</h2>

      {tasks.length === 0 && <p>No tasks waiting.</p>}

      {tasks.map(t => (
        <div key={t.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>{t.title}</strong></p>
          <p>Worker: {t.workerName}</p>
          <p>Submitted: {t.submittedAt}</p>
        </div>
      ))}
    </section>
  );
}