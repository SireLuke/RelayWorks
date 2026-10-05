import dotenv from "dotenv";
import app from "./app";
import express from "express";
import reviewerRoutes from "./routes/reviewer";

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