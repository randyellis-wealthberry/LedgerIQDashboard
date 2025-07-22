// This file is kept for reference but not used since we're using server-side data
// All mock data is now generated in the server storage layer

export const mockDashboardStats = {
  criticalAnomalies: 23,
  pendingReview: 156,
  resolvedToday: 89,
  amountAtRisk: "$284,920",
  trends: [
    { date: "Oct 20", critical: 12, high: 24, medium: 45 },
    { date: "Oct 22", critical: 8, high: 18, medium: 52 },
    { date: "Oct 24", critical: 15, high: 32, medium: 48 },
    // ... more trend data
  ]
};
