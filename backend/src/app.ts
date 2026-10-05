import { authMiddleware } from "./middleware/auth.middleware";
import { requireRole } from "./middleware/role.middleware";

app.get(
  "/owner/test",
  authMiddleware,
  requireRole(["OWNER"]),
  (req, res) => {
    res.json({ message: "Owner route works" });
  }
);