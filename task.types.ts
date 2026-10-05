export interface CreateTaskDTO {
  title: string;
  description: string;
  clientId: string;
  operatorId: string;
}

export interface AssignTaskDTO {
  taskId: string;
  workerId: string;
}

export interface SubmitTaskDTO {
  taskId: string;
  submissionText: string;
}

export interface ReviewTaskDTO {
  taskId: string;
  reviewerId: string;
  status: "APPROVED" | "REJECTED";
  notes?: string;
}