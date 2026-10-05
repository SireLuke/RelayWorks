export async function getWorkerDashboard() {
  const res = await fetch("http://localhost:4000/dashboard/worker", {
    credentials: "include"
  });
  return res.json();
}

export async function getWorkerTasks() {
  const res = await fetch("http://localhost:4000/tasks/worker", {
    credentials: "include"
  });
  return res.json();
}

export async function submitWorkerTask(body: any) {
  const res = await fetch("http://localhost:4000/tasks/submit", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getWorkerPayouts() {
  const res = await fetch("http://localhost:4000/payouts/worker", {
    credentials: "include"
  });
  return res.json();
}

export async function getWorkerMessages() {
  const res = await fetch("http://localhost:4000/messages/worker", {
    credentials: "include"
  });
  return res.json();
}

export async function getWorkerActivity() {
  const res = await fetch("http://localhost:4000/activity/me", {
    credentials: "include"
  });
  return res.json();
}