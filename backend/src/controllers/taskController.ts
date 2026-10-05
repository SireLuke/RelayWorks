import { Request, Response } from "express";
import * as taskService from "../services/taskService";

// OWNER: create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;
    const { title, description, payoutAmount } = req.body;

    const task = await taskService.createTask(operatorId, title, description, payoutAmount);
    res.json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// OWNER: assign worker
export const assignWorker = async (req: Request, res: Response) => {
  try {
    const operatorId = (req as any).user?.operatorId;
    const { taskId, workerId } = req.body;

    const task = await taskService.assignWorker(operatorId, taskId, workerId);
    res.json(task);
  } catch (err) {
    console.error("Assign Worker Error:", err);
    res.status(500).json({ error: "Failed to assign worker" });
  }
};

// WORKER: accept task
export const acceptTask = async (req: Request, res: Response) => {
  try {
    const workerId = (req as any).user?.id;
    const { taskId } = req.body;

    const task = await taskService.acceptTask(workerId, taskId);
    res.json(task);
  } catch (err) {
    console.error("Accept Task Error:", err);
    res.status(500).json({ error: "Failed to accept task" });
  }
};

// WORKER: mark in-progress
export const markInProgress = async (req: Request, res: Response) => {
  try {
    const workerId = (req as any).user?.id;
    const { taskId } = req.body;

    const task = await taskService.markInProgress(workerId, taskId);
    res.json(task);
  } catch (err) {
    console.error("Mark In Progress Error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// WORKER: complete task
export const completeTask = async (req: Request, res: Response) => {
  try {
    const workerId = (req as any).user?.id;
    const { taskId } = req.body;

    const task = await taskService.completeTask(workerId, taskId);
    res.json(task);
  } catch (err) {
    console.error("Complete Task Error:", err);
    res.status(500).json({ error: "Failed to complete task" });
  }
};

// REVIEWER: approve
export const approveTask = async (req: Request, res: Response) => {
  try {
    const reviewerId = (req as any).user?.id;
    const operatorId = (req as any).user?.operatorId;
    const { taskId } = req.body;

    const task = await taskService.approveTask(operatorId, reviewerId, taskId);
    res.json(task);
  } catch (err) {
    console.error("Approve Task Error:", err);
    res.status(500).json({ error: "Failed to approve task" });
  }
};

// REVIEWER: request changes
export const requestChanges = async (req: Request, res: Response) => {
  try {
    const reviewerId = (req as any).user?.id;
    const operatorId = (req as any).user?.operatorId;
    const { taskId, reason } = req.body;

    const task = await taskService.requestChanges(operatorId, reviewerId, taskId, reason);
    res.json(task);
  } catch (err) {
    console.error("Request Changes Error:", err);
    res.status(500).json({ error: "Failed to request changes" });
  }
};