export default function MetricsPanel({ data }: any) {
  const box = {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px",
    background: "#fafafa",
    width: "180px"
  };

  return (
    <section>
      <h2>Overview</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={box}>Workers: {data.workers}</div>
        <div style={box}>Clients: {data.clients}</div>
        <div style={box}>Active Tasks: {data.activeTasks}</div>
        <div style={box}>Pending Reviews: {data.pendingReviews}</div>
        <div style={box}>Payouts Waiting: {data.pendingPayouts}</div>
        <div style={box}>Earnings: ${data.earnings}</div>
        <div style={box}>Platform Fees: ${data.platformFees}</div>
      </div>
    </section>
  );
}