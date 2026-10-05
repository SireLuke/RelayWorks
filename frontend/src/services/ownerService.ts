export async function getOwnerDashboard() {
  const res = await fetch("http://localhost:4000/dashboard/owner", {
    credentials: "include"
  });
  return res.json();
}

export async function getOwnerOperators() {
  const res = await fetch("http://localhost:4000/owner/operators", {
    credentials: "include"
  });
  return res.json();
}

export async function getOwnerRevenue() {
  const res = await fetch("http://localhost:4000/owner/revenue", {
    credentials: "include"
  });
  return res.json();
}

export async function getOwnerActivity() {
  const res = await fetch("http://localhost:4000/activity/owner", {
    credentials: "include"
  });
  return res.json();
}