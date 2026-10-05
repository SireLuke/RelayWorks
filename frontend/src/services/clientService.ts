export async function getClientDashboard() {
  const res = await fetch("http://localhost:4000/dashboard/client", {
    credentials: "include"
  });
  return res.json();
}

export async function getClientTasks() {
  const res = await fetch("http://localhost:4000/tasks/client", {
    credentials: "include"
  });
  return res.json();
}

export async function createClientTask(body: any) {
  const res = await fetch("http://localhost:4000/tasks/create", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getClientInvoices() {
  const res = await fetch("http://localhost:4000/invoices/client", {
    credentials: "include"
  });
  return res.json();
}

export async function getClientMessages() {
  const res = await fetch("http://localhost:4000/messages/client", {
    credentials: "include"
  });
  return res.json();
}

export async function getClientActivity() {
  const res = await fetch("http://localhost:4000/activity/me", {
    credentials: "include"
  });
  return res.json();
}