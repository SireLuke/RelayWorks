import * as ownerService from "../services/ownerService";

export const getDashboard = async (req, res) => {
  try {
    const data = await ownerService.getDashboardData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load owner dashboard" });
  }
};