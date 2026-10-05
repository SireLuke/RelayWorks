import { useEffect, useState } from "react";
import { getReviewerDashboard } from "../../services/reviewerService";

import ReviewerTaskList from "../../components/reviewer/ReviewerTaskList";
import ReviewerApprovalPanel from "../../components/reviewer/ReviewerApprovalPanel";
import ReviewerMessagesPanel from "../../components/reviewer/ReviewerMessagesPanel";
import ReviewerActivityPanel from "../../components/reviewer/ReviewerActivityPanel";

export default function ReviewerDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getReviewerDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading Reviewer Dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviewer Dashboard</h1>

      <section>
        <h2>Overview</h2>
        <p><strong>Tasks Waiting:</strong> {data.pendingReviews}</p>
        <p><strong>Approved:</strong> {data.approved}</p>
        <p><strong>Changes Requested:</strong> {data.changesRequested}</p>
      </section>

      <hr />

      <ReviewerTaskList />

      <hr />

      <ReviewerApprovalPanel />

      <hr />

      <ReviewerMessagesPanel />

      <hr />

      <ReviewerActivityPanel />
    </div>
  );
}