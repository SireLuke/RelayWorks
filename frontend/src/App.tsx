import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientDashboard from "./pages/client/ClientDashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";

<Route path="/worker" element={<WorkerDashboard />} />
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/operator" element={<OperatorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}