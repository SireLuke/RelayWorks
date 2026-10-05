import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientDashboard from "./pages/client/ClientDashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/operator" element={<OperatorDashboard />} />
<Route path="/owner" element={<OwnerDashboard />} />
<Route path="/reviewer"
element={<ReviewerDashboard />} />
<Route path="/worker" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}