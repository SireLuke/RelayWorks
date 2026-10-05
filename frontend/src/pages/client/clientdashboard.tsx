import { useEffect, useState } from "react";
import { getClientDashboard } from "../../services/clientService";

import Layout from "../../components/layout/Layout";

import TaskList from "../../components/client/TaskList";
import CreateTaskForm from "../../components/client/CreateTaskForm";
import InvoicePanel from "../../components/client/InvoicePanel";
import ActivityPanel from "../../components/client/ActivityPanel";
import MessagesPanel from "../../components/client/MessagesPanel";

export default function ClientDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getClientDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading Client Dashboard...</p>;

  return (
    <Layout>
      <h1>Client Dashboard</h1>

      <section>
        <h2>Overview</h2>
        <p><strong>Active Tasks:</strong> {data.activeTasks}</p>
        <p><strong>Completed Tasks:</strong> {data.completedTasks}</p>
        <p><strong>Pending Approvals:</strong> {data.pendingApprovals}</p>
        <p><strong>Total Spent:</strong> ${data.totalSpent}</p>
        <p><strong>Assigned Operator:</strong> {data.operatorName}</p>
      </section>

      <hr />

      <TaskList />

      <hr />

      <CreateTaskForm />

      <hr />

      <InvoicePanel />

      <hr />

      <MessagesPanel />

      <hr />

      <ActivityPanel />
    </Layout>
  );
}