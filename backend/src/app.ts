import { authMiddleware } from "./middleware/auth.middleware";
import { requireRole } from "./middleware/role.middleware";
import taskRoutes from "./modules/tasks/task.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
app.use("/dashboard", dashboardRoutes);

app.use("/payments", paymentRoutes);
app.use("/tasks", taskRoutes);

app.get(
  "/owner/test",
  authMiddleware,
  requireRole(["OWNER"]),
  (req, res) => {
    res.json({ message: "Owner route works" });
  }
);