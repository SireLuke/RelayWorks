import { useState } from "react";
import { approveTask, requestChanges } from "../../services/reviewerService";

export default function ReviewerApprovalPanel() {
  const [form, setForm] = useState({
    taskId: "",
    feedback: ""
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleApprove() {
    await approveTask(form);
    alert("Task approved!");
  }

  async function handleChanges() {
    await requestChanges(form);
    alert("Changes requested!");
  }

  return (
    <section>
      <h2>Review Actions</h2>

      <input
        name="taskId"
        placeholder="Task ID"
        value={form.taskId}
        onChange={handleChange}
        required
      />
      <br />

      <textarea
        name="feedback"
        placeholder="Feedback or change request"
        value={form.feedback}
        onChange={handleChange}
        required
      />
      <br />

      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleChanges}>Request Changes</button>
    </section>
  );
}