import { authMiddleware } from "./middleware/auth.middleware";
import { requireRole } from "./middleware/role.middleware";
import taskRoutes from "./modules/tasks/task.routes";
app.use("/tasks", taskRoutes);
app.get(
  "/owner/test",
  authMiddleware,
  requireRole(["OWNER"]),
  (req, res) => {
    res.json({ message: "Owner route works" });
  }
);