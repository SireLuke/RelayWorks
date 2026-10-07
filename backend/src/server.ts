import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Example route
app.get("/", (req, res) => {
  res.send("RelayWorks backend is running");
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
