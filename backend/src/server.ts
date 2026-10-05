import dotenv from "dotenv";
import app from "./app";
import express from "express";
import reviewerRoutes from "./routes/reviewer";
import express from "express";
import workerRoutes from "./routes/worker";
import express from "express";
import taskRoutes from "./routes/task";
import express from "express";
import paymentRoutes from "./routes/payment";
import express from "express";
import { authMiddleware } from "./middleware/auth";
import ownerRoutes from "./routes/owner";
import reviewerRoutes from "./routes/reviewer";
import workerRoutes from "./routes/worker";
import taskRoutes from "./routes/task";
import paymentRoutes from "./routes/payment";

const app = express();

app.use(express.json());

// Global auth for protected routes
app.use(authMiddleware);

// Dashboards
app.use("/dashboard/owner", ownerRoutes);
app.use("/dashboard", reviewerRoutes);
app.use("/dashboard", workerRoutes);

// Task lifecycle
app.use("/task", taskRoutes);

// Payments
app.use("/payment", paymentRoutes);

export default app;
const app = express();

// ... existing middleware, JSON parsing, auth, etc.

app.use("/payment", paymentRoutes);

// ... existing error handlers, listen(), etc.

export default app;
const app = express();

// ... existing middleware, JSON parsing, auth, etc.

app.use("/task", taskRoutes);

// ... existing error handlers, listen(), etc.

export default app;
const app = express();

// ... existing middleware, JSON parsing, auth, etc.

app.use("/dashboard", workerRoutes);

// ... existing error handlers, listen(), etc.

export default app;
const app = express();

// ... existing middleware, JSON parsing, auth, etc.

app.use("/dashboard", reviewerRoutes);

// ... existing error handlers, listen(), etc.

export default app;
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`RelayWorks backend running on port ${PORT}`);
});