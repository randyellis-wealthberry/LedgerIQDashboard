// Mock data for the LedgerIQ demo project
// This replaces the server-side storage for the design case study

export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  email: string;
  position: string;
  salary: number;
  hireDate: Date;
  status: string;
  avatar: string | null;
  averageMonthlyOT: string | null;
  performanceRating: string | null;
}

export interface Anomaly {
  id: number;
  employeeId: number;
  type: string;
  description: string;
  riskLevel: string;
  amount: string;
  variance: string | null;
  confidence: number;
  status: string;
  payPeriod: string;
  overtimeHours: string | null;
  normalOvertimeHours: string | null;
  hourlyRate: string | null;
  detectedAt: Date;
  resolvedAt: Date | null;
}

export interface AiInsight {
  id: number;
  anomalyId: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  impact: string;
  rootCause: string;
  riskAssessment: string;
  recommendedActions: string[];
  historicalMatches: string[] | null;
  confidence: number;
  generatedAt: Date;
}

export interface AnomalyWithEmployee extends Anomaly {
  employee: Employee;
}

export interface AnomalyWithInsights extends AnomalyWithEmployee {
  aiInsight?: AiInsight;
}

// Mock employees data
export const mockEmployees: Employee[] = [
  {
    id: 1,
    employeeId: "EMP-1247",
    name: "Sarah Chen",
    department: "Engineering",
    email: "sarah.chen@company.com",
    position: "Senior Software Engineer",
    salary: 125000,
    hireDate: new Date('2022-03-15'),
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b45a4b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    averageMonthlyOT: "18.3",
    performanceRating: "Excellent"
  },
  {
    id: 2,
    employeeId: "EMP-2156",
    name: "Marcus Johnson",
    department: "Sales",
    email: "marcus.johnson@company.com",
    position: "Account Executive",
    salary: 95000,
    hireDate: new Date('2021-08-22'),
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    averageMonthlyOT: "12.5",
    performanceRating: "Good"
  },
  {
    id: 3,
    employeeId: "EMP-3094",
    name: "Emma Rodriguez",
    department: "Marketing",
    email: "emma.rodriguez@company.com",
    position: "Marketing Manager",
    salary: 85000,
    hireDate: new Date('2023-01-10'),
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    averageMonthlyOT: "9.8",
    performanceRating: "Excellent"
  }
];

// Mock anomalies data
export const mockAnomalies: Anomaly[] = [
  {
    id: 1,
    employeeId: 1,
    type: "Overtime Spike",
    description: "287% above baseline",
    riskLevel: "Critical",
    amount: "12450.00",
    variance: "+287%",
    confidence: 94,
    status: "Under Review",
    payPeriod: "Nov 1-15, 2024",
    overtimeHours: "62.5",
    normalOvertimeHours: "16.2",
    hourlyRate: "75.00",
    detectedAt: new Date(Date.now() - 2 * 60 * 1000),
    resolvedAt: null
  },
  {
    id: 2,
    employeeId: 2,
    type: "Duplicate Entry",
    description: "Potential double payment",
    riskLevel: "High",
    amount: "8750.00",
    variance: null,
    confidence: 87,
    status: "Investigating",
    payPeriod: "Nov 1-15, 2024",
    overtimeHours: null,
    normalOvertimeHours: null,
    hourlyRate: "65.00",
    detectedAt: new Date(Date.now() - 5 * 60 * 1000),
    resolvedAt: null
  },
  {
    id: 3,
    employeeId: 3,
    type: "Rate Variance",
    description: "15% above standard rate",
    riskLevel: "Medium",
    amount: "3200.00",
    variance: "+15%",
    confidence: 78,
    status: "Resolved",
    payPeriod: "Nov 1-15, 2024",
    overtimeHours: null,
    normalOvertimeHours: null,
    hourlyRate: "55.00",
    detectedAt: new Date(Date.now() - 8 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 3 * 60 * 1000)
  }
];

// Mock AI insights data
export const mockAiInsights: AiInsight[] = [
  {
    id: 1,
    anomalyId: 1,
    title: "Overtime Analysis",
    description: "Detailed analysis of overtime spike pattern",
    priority: "high",
    status: "pending",
    impact: "high",
    rootCause: "Project deadline pressure likely caused extended work hours. Similar pattern observed during Q3 product launch.",
    riskAssessment: "High probability of legitimate overtime. Low risk of fraudulent activity (8%).",
    recommendedActions: [
      "Approve with manager verification",
      "Request manager approval",
      "Investigate further"
    ],
    historicalMatches: [
      "Similar pattern (Q3 2023) - 94% match",
      "Holiday overtime spike - 87% match"
    ],
    confidence: 94,
    generatedAt: new Date()
  },
  {
    id: 2,
    anomalyId: 2,
    title: "Duplicate Payment Analysis",
    description: "Analysis of potential duplicate payment entry",
    priority: "medium",
    status: "pending",
    impact: "medium",
    rootCause: "Duplicate payroll entries detected in system. Potential manual entry error during payroll processing.",
    riskAssessment: "Medium risk of overpayment. System error most likely cause rather than fraud.",
    recommendedActions: [
      "Review payroll entries",
      "Verify with HR department",
      "Implement additional validation"
    ],
    historicalMatches: [
      "Duplicate entry pattern (Oct 2024) - 91% match"
    ],
    confidence: 87,
    generatedAt: new Date()
  }
];

// Combine anomalies with employee data
export const mockAnomaliesWithEmployees: AnomalyWithEmployee[] = mockAnomalies.map(anomaly => ({
  ...anomaly,
  employee: mockEmployees.find(emp => emp.id === anomaly.employeeId)!
}));

// Combine anomalies with employee and AI insight data
export const mockAnomaliesWithInsights: AnomalyWithInsights[] = mockAnomalies.map(anomaly => ({
  ...anomaly,
  employee: mockEmployees.find(emp => emp.id === anomaly.employeeId)!,
  aiInsight: mockAiInsights.find(insight => insight.anomalyId === anomaly.id)
}));

// Dashboard stats
export const mockDashboardStats = {
  criticalAnomalies: mockAnomalies.filter(a => a.riskLevel === "Critical").length,
  pendingReview: mockAnomalies.filter(a => a.status === "Under Review").length,
  resolvedToday: mockAnomalies.filter(a => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return a.status === "Resolved" && a.resolvedAt && new Date(a.resolvedAt) >= todayStart;
  }).length,
  amountAtRisk: `$${mockAnomalies
    .filter(a => a.status !== "Resolved")
    .reduce((sum, a) => sum + parseFloat(a.amount), 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
  trends: [
    { date: "Nov 14", critical: 12, high: 24, medium: 45 },
    { date: "Nov 15", critical: 8, high: 18, medium: 52 },
    { date: "Nov 16", critical: 15, high: 32, medium: 48 },
    { date: "Nov 17", critical: 21, high: 28, medium: 43 },
    { date: "Nov 18", critical: 18, high: 25, medium: 49 },
    { date: "Nov 19", critical: 23, high: 31, medium: 46 },
    { date: "Nov 20", critical: 19, high: 29, medium: 51 },
    { date: "Nov 21", critical: 26, high: 34, medium: 44 },
    { date: "Nov 22", critical: 31, high: 37, medium: 42 },
    { date: "Nov 23", critical: 28, high: 33, medium: 47 },
    { date: "Nov 24", critical: 34, high: 39, medium: 41 },
    { date: "Nov 25", critical: 29, high: 35, medium: 45 },
    { date: "Nov 26", critical: 37, high: 41, medium: 38 },
    { date: "Nov 27", critical: 23, high: 31, medium: 43 }
  ]
};
