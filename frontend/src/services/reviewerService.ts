export async function getReviewerDashboard() {
  const res = await fetch("http://localhost:4000/dashboard/reviewer", {
    credentials: "include"
  });
  return res.json();
}

export async function getReviewerTasks() {
  const res = await fetch("http://localhost:4000/tasks/reviewer", {
    credentials: "include"
  });
  return res.json();
}

export async function approveTask(body: any) {
  const res = await fetch("http://localhost:4000/tasks/approve", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function requestChanges(body: any) {
  const res = await fetch("http://localhost:4000/tasks/request-changes", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getReviewerMessages() {
  const res = await fetch("http://localhost:4000/messages/reviewer", {
    credentials: "include"
  });
  return res.json();
}

export async function getReviewerActivity() {
  const res = await fetch("http://localhost:4000/activity/me", {
    credentials: "include"
  });
  return res.json();
}