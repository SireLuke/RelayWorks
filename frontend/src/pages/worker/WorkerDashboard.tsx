import { useEffect, useState } from "react";
import { getWorkerDashboard } from "../../services/workerService";

import Layout from "../../components/layout/Layout";

import WorkerTaskList from "../../components/worker/WorkerTaskList";
import WorkerSubmitPanel from "../../components/worker/WorkerSubmitPanel";
import WorkerPayoutPanel from "../../components/worker/WorkerPayoutPanel";
import WorkerMessagesPanel from "../../components/worker/WorkerMessagesPanel";
import WorkerActivityPanel from "../../components/worker/WorkerActivityPanel";

export default function WorkerDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getWorkerDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading Worker Dashboard...</p>;

  return (
    <Layout>
      <h1>Worker Dashboard</h1>

      <section>
        <h2>Overview</h2>
        <p><strong>Assigned Tasks:</strong> {data.assignedTasks}</p>
        <p><strong>Completed Tasks:</strong> {data.completedTasks}</p>
        <p><strong>Total Earned:</strong> ${data.totalEarned}</p>
      </section>

      <hr />

      <WorkerTaskList />

      <hr />

      <WorkerSubmitPanel />

      <hr />

      <WorkerPayoutPanel />

      <hr />

      <WorkerMessagesPanel />

      <hr />

      <WorkerActivityPanel />
    </Layout>
  );
}