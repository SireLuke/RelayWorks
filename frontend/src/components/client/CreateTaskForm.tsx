import { useState } from "react";
import { createClientTask } from "../../services/clientService";

export default function CreateTaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: ""
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await createClientTask(form);
    alert("Task created!");
  }

  return (
    <section>
      <h2>Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <br />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <br />

        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <br />

        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
        <br />

        <button type="submit">Create Task</button>
      </form>
    </section>
  );
}