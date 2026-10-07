import { Request, Response } from "express";
import { prisma } from "../prismaClient"; // adjust path if needed
import { AuthRequest } from "../middleware/auth";
import { TaskStatus } from "@prisma/client";

// CREATE TASK
export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, payoutAmount } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        payoutAmount,
        operatorId: req.user.operatorId,
        status: TaskStatus.UNASSIGNED
      }
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not create task" });
  }
}

// ASSIGN TASK TO WORKER
export async function assignTask(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { workerId } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        workerId,
        status: TaskStatus.ASSIGNED
      }
    });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not assign task" });
  }
}

// UPDATE TASK STATUS
export async function updateTaskStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        status
      }
    });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not update task status" });
  }
}

// LIST TASKS (role-based)
export async function getTasks(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let tasks;

    switch (req.user.role) {
      case "OWNER":
      case "OPERATOR":
        tasks = await prisma.task.findMany({
          where: { operatorId: req.user.operatorId }
        });
        break;
      case "WORKER":
        tasks = await prisma.task.findMany({
          where: { workerId: req.user.id }
        });
        break;
      case "REVIEWER":
        tasks = await prisma.task.findMany({
          where: { operatorId: req.user.operatorId }
        });
        break;
      default:
        tasks = [];
    }

    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch tasks" });
  }
}

// GET SINGLE TASK
export async function getTaskById(req: AuthRequest, res: Response) {
  try, {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        worker: true,
        review: true
      }
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch task" });
  }
}
