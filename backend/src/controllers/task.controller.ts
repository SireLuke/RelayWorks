import { Request, Response } from "express";
import { TaskStatus } from "@prisma/client";
import { prisma } from "../prismaClient";

const statuses = new Set<string>(Object.values(TaskStatus));

function actor(req: Request) {
  return req.user;
}

export async function createTask(req: Request, res: Response) {
  const user = actor(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
  const description = typeof req.body?.description === "string" ? req.body.description.trim() : "";
  const payoutAmount = Number(req.body?.payoutAmount);

  if (!title || !description || !Number.isFinite(payoutAmount) || payoutAmount < 0) {
    return res.status(400).json({ error: "title, description, and a non-negative payoutAmount are required" });
  }

  try {
    const task = await prisma.task.create({
      data: { operatorId: user.operatorId, title, description, payoutAmount }
    });
    return res.status(201).json({ task });
  } catch (error) {
    console.error("createTask failed", error);
    return res.status(500).json({ error: "Unable to create task" });
  }
}

export async function assignTask(req: Request, res: Response) {
  const user = actor(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const workerId = typeof req.body?.workerId === "string" ? req.body.workerId : "";
  if (!workerId) return res.status(400).json({ error: "workerId is required" });

  try {
    const [task, worker] = await Promise.all([
      prisma.task.findFirst({ where: { id: req.params.id, operatorId: user.operatorId } }),
      prisma.worker.findFirst({ where: { id: workerId, operatorId: user.operatorId } })
    ]);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    if (task.status !== "UNASSIGNED" && task.workerId !== workerId) {
      return res.status(409).json({ error: "Only unassigned tasks can be assigned or reassigned after unassignment" });
    }

    const updated = await prisma.task.update({
      where: { id: task.id },
      data: { workerId, status: "ASSIGNED" }
    });
    return res.json({ task: updated });
  } catch (error) {
    console.error("assignTask failed", error);
    return res.status(500).json({ error: "Unable to assign task" });
  }
}

export async function updateTaskStatus(req: Request, res: Response) {
  const user = actor(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const status = req.body?.status;
  if (typeof status !== "string" || !statuses.has(status)) {
    return res.status(400).json({ error: "A valid task status is required" });
  }

  try {
    const task = await prisma.task.findFirst({
      where: { id: req.params.id, operatorId: user.operatorId }
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const privileged = user.role === "OWNER" || user.role === "OPERATOR";
    if (!privileged && (user.role !== "WORKER" || task.workerId !== user.id)) {
      return res.status(403).json({ error: "You cannot update this task" });
    }

    const allowed: Record<TaskStatus, TaskStatus[]> = {
      UNASSIGNED: ["ASSIGNED"],
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["COMPLETED"],
      COMPLETED: ["PAID"],
      PAID: []
    };
    if (!allowed[task.status].includes(status as TaskStatus)) {
      return res.status(409).json({ error: `Invalid status transition: ${task.status} -> ${status}` });
    }
    if (status === "PAID" && !privileged) {
      return res.status(403).json({ error: "Only an owner or operator can mark a task paid" });
    }

    const updated = await prisma.task.update({
      where: { id: task.id },
      data: {
        status: status as TaskStatus,
        ...(status === "COMPLETED" ? { completedAt: new Date() } : {})
      }
    });
    return res.json({ task: updated });
  } catch (error) {
    console.error("updateTaskStatus failed", error);
    return res.status(500).json({ error: "Unable to update task status" });
  }
}

export async function getTasks(req: Request, res: Response) {
  const user = actor(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  try {
    const where = user.role === "WORKER"
      ? { operatorId: user.operatorId, workerId: user.id }
      : { operatorId: user.operatorId };
    const tasks = await prisma.task.findMany({
      where,
      include: { worker: { select: { id: true, email: true } }, review: true },
      orderBy: { createdAt: "desc" }
    });
    return res.json({ tasks });
  } catch (error) {
    console.error("getTasks failed", error);
    return res.status(500).json({ error: "Unable to list tasks" });
  }
}

export async function getTaskById(req: Request, res: Response) {
  const user = actor(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        operatorId: user.operatorId,
        ...(user.role === "WORKER" ? { workerId: user.id } : {})
      },
      include: { worker: { select: { id: true, email: true } }, review: true }
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.json({ task });
  } catch (error) {
    console.error("getTaskById failed", error);
    return res.status(500).json({ error: "Unable to fetch task" });
  }
}
