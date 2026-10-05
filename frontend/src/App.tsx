import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClientDashboard from "./pages/client/ClientDashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";

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