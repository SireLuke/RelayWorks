export default function OwnerMetricsPanel({ data }: any) {
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
      <h2>Platform Metrics</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={box}>Operators: {data.operators}</div>
        <div style={box}>Clients: {data.clients}</div>
        <div style={box}>Workers: {data.workers}</div>
        <div style={box}>Active Tasks: {data.activeTasks}</div>
        <div style={box}>Completed Tasks: {data.completedTasks}</div>
        <div style={box}>Total Revenue: ${data.totalRevenue}</div>
        <div style={box}>Platform Fees: ${data.platformFees}</div>
      </div>
    </section>
  );
}