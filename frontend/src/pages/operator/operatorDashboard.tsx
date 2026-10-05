import { useEffect, useState } from "react";
import { getOperatorDashboard } from "../../services/operatorService";

import MetricsPanel from "../../components/operator/MetricsPanel";
import WorkerPanel from "../../components/operator/WorkerPanel";
import ClientPanel from "../../components/operator/ClientPanel";
import TaskPipeline from "../../components/operator/TaskPipeline";
import PayoutPanel from "../../components/operator/PayoutPanel";
import NotificationsPanel from "../../components/operator/NotificationsPanel";
import ActivityPanel from "../../components/operator/ActivityPanel";

export default function OperatorDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getOperatorDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading Operator Dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Operator Dashboard</h1>

      <MetricsPanel data={data} />

      <hr />

      <TaskPipeline />

      <hr />

      <WorkerPanel />

      <hr />

      <ClientPanel />

      <hr />

      <PayoutPanel />

      <hr />

      <NotificationsPanel />

      <hr />

      <ActivityPanel />
    </div>
  );
}