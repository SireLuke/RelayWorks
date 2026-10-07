// src/controllers/task.controller.ts

import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import {
  createTaskService,
  assignTaskService,
  updateTaskStatusService,
  listTasksService,
  getTaskByIdService
} from "../services/task.service";

// 1. CREATE TASK
export async function createTask(req: AuthRequest, res: Response) {
  ...
}

// 2. ASSIGN TASK
export async function assignTask(req: AuthRequest, res: Response) {
  ...
}

// 3. UPDATE TASK STATUS   <── goes right here
export async function updateTaskStatus(req: AuthRequest, res: Response) {
  ...
}

// 4. LIST TASKS
export async function getTasks(req: AuthRequest, res: Response) {
  ...
}

// 5. GET TASK BY ID       <── goes right here
export async function getTaskById(req: AuthRequest, res: Response) {
  ...
}
