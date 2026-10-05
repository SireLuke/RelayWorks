export async function getOperatorDashboard() {
  const res = await fetch("http://localhost:4000/dashboard/operator", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorWorkers() {
  const res = await fetch("http://localhost:4000/operator/workers", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorClients() {
  const res = await fetch("http://localhost:4000/operator/clients", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorTasks() {
  const res = await fetch("http://localhost:4000/tasks/operator", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorPayouts() {
  const res = await fetch("http://localhost:4000/payouts/operator", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorNotifications() {
  const res = await fetch("http://localhost:4000/notifications", {
    credentials: "include"
  });
  return res.json();
}

export async function getOperatorActivity() {
  const res = await fetch("http://localhost:4000/activity/me", {
    credentials: "include"
  });
  return res.json();
}