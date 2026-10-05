import { BrowserRouter, Routes, Route } from "react-router-dom";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/reviewer" element={<ReviewerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}