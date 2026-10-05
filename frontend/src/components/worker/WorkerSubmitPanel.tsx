import { useState } from "react";
import { submitWorkerTask } from "../../services/workerService";

export default function WorkerSubmitPanel() {
  const [form, setForm] = useState({
    taskId: "",
    submissionText: ""
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await submitWorkerTask(form);
    alert("Submission sent!");
  }

  return (
    <section>
      <h2>Submit Work</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="taskId"
          placeholder="Task ID"
          value={form.taskId}
          onChange={handleChange}
          required
        />
        <br />

        <textarea
          name="submissionText"
          placeholder="Paste your work here"
          value={form.submissionText}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Submit Work</button>
      </form>
    </section>
  );
}