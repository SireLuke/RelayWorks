import "dotenv/config";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import { prisma } from "./prismaClient";

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be configured in production");
}

const app = express();
const allowedOrigin = process.env.FRONTEND_ORIGIN;

app.use(cors({
  origin: allowedOrigin || true,
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ status: "ok", database: "connected", time: new Date().toISOString() });
  } catch {
    return res.status(503).json({ status: "degraded", database: "unavailable", time: new Date().toISOString() });
  }
});

app.get("/", (_req, res) => {
  return res.json({
    name: "RelayWorks API",
    status: "running",
    endpoints: ["/health", "/auth/login", "/tasks"]
  });
});

const PORT = Number(process.env.PORT || 3000);
const server = app.listen(PORT, () => {
  console.log(`RelayWorks API listening on port ${PORT}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received; shutting down RelayWorks`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
