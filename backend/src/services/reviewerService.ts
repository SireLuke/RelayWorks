import { prisma } from "../prismaClient";

export async function getReviewerDashboard(operatorId: string) {
  // Pending reviews
  const pendingReviews = await prisma.taskReview.count({
    where: { operatorId, status: "PENDING" },
  });

  // Approved reviews
  const approvedReviews = await prisma.taskReview.count({
    where: { operatorId, status: "APPROVED" },
  });

  // Changes requested
  const changesRequested = await prisma.taskReview.count({
    where: { operatorId, status: "CHANGES_REQUESTED" },
  });

  // Tasks needing review (tasks completed but not reviewed)
  const tasksNeedingReview = await prisma.task.count({
    where: {
      operatorId,
      status: "COMPLETED",
      reviewId: null,
    },
  });

  // Tasks reviewed today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasksReviewedToday = await prisma.taskReview.count({
    where: {
      operatorId,
      createdAt: { gte: today },
    },
  });

  // Reviewer score (simple formula)
  const reviewerScore = approvedReviews - changesRequested;

  return {
    pendingReviews,
    approvedReviews,
    changesRequested,
    tasksNeedingReview,
    tasksReviewedToday,
    reviewerScore,
  };
}