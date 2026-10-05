import { authMiddleware } from "./middleware/auth.middleware";
import { requireRole } from "./middleware/role.middleware";
import taskRoutes from "./modules/tasks/task.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import profileRoutes from "./modules/profile/profile.routes";
import notificationRoutes from "./modules/notifications/notification.routes";
import activityRoutes from "./modules/activity/activity.routes";
import settingsRoutes from "./modules/settings/settings.routes";
app.use("/settings", settingsRoutes);
app.use("/activity", activityRoutes);
app.use("/notifications", notificationRoutes);
app.use("/profile", profileRoutes);
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