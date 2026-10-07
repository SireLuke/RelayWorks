import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import {
  createTaskService,
  assignTaskService,
  updateTaskStatusService,
  listTasksService,
  getTaskByIdService
} from "../services/task.service";

// CREATE TASK
export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, payoutAmount } = req.body;

    const task = await createTaskService(req.user!.operatorId, {
      title,
      description,
      payoutAmount
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not create task" });
  }
}

// ASSIGN TASK
export async function assignTask(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { workerId } = req.body;

    const task = await assignTaskService(id, workerId);

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not assign task" });
  }
}

// UPDATE STATUS
export async function updateTaskStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await updateTaskStatusService(id, status);

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not update task status" });
  }
}

// LIST TASKS
export async function getTasks(req: AuthRequest, res: Response) {
  try {
    const tasks = await listTasksService(req.user!);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch tasks" });
  }
}

// GET SINGLE TASK
export async function getTaskById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const task = await getTaskByIdService(id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch task" });
  }
}
