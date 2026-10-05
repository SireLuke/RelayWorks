import { useEffect, useState } from "react";
import { getOwnerDashboard } from "../../services/ownerService";

import Layout from "../../components/layout/Layout";

import OwnerMetricsPanel from "../../components/owner/OwnerMetricsPanel";
import OwnerOperatorPanel from "../../components/owner/OwnerOperatorPanel";
import OwnerRevenuePanel from "../../components/owner/OwnerRevenuePanel";
import OwnerActivityPanel from "../../components/owner/OwnerActivityPanel";

export default function OwnerDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getOwnerDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading Owner Dashboard...</p>;

  return (
    <Layout>
      <h1>Owner Dashboard</h1>

      <OwnerMetricsPanel data={data} />

      <hr />

      <OwnerOperatorPanel />

      <hr />

      <OwnerRevenuePanel />

      <hr />

      <OwnerActivityPanel />
    </Layout>
  );
}