import { users, employees, anomalies, aiInsights, type User, type InsertUser, type Employee, type InsertEmployee, type Anomaly, type InsertAnomaly, type AiInsight, type InsertAiInsight, type AnomalyWithEmployee, type AnomalyWithInsights } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Employees
  getEmployee(id: number): Promise<Employee | undefined>;
  getEmployeeByEmployeeId(employeeId: string): Promise<Employee | undefined>;
  getAllEmployees(): Promise<Employee[]>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;

  // Anomalies
  getAnomaly(id: number): Promise<Anomaly | undefined>;
  getAnomalyWithEmployee(id: number): Promise<AnomalyWithEmployee | undefined>;
  getAnomalyWithInsights(id: number): Promise<AnomalyWithInsights | undefined>;
  getAllAnomalies(): Promise<AnomalyWithEmployee[]>;
  getAnomaliesByRiskLevel(riskLevel: string): Promise<AnomalyWithEmployee[]>;
  getAnomaliesByDepartment(department: string): Promise<AnomalyWithEmployee[]>;
  createAnomaly(anomaly: InsertAnomaly): Promise<Anomaly>;
  updateAnomalyStatus(id: number, status: string): Promise<Anomaly | undefined>;

  // AI Insights
  getAiInsight(anomalyId: number): Promise<AiInsight | undefined>;
  createAiInsight(insight: InsertAiInsight): Promise<AiInsight>;

  // Dashboard Stats
  getDashboardStats(): Promise<{
    criticalAnomalies: number;
    pendingReview: number;
    resolvedToday: number;
    amountAtRisk: string;
    trends: Array<{ date: string; critical: number; high: number; medium: number; }>;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private employees: Map<number, Employee>;
  private anomalies: Map<number, Anomaly>;
  private aiInsights: Map<number, AiInsight>;
  private currentUserId: number;
  private currentEmployeeId: number;
  private currentAnomalyId: number;
  private currentInsightId: number;

  constructor() {
    this.users = new Map();
    this.employees = new Map();
    this.anomalies = new Map();
    this.aiInsights = new Map();
    this.currentUserId = 1;
    this.currentEmployeeId = 1;
    this.currentAnomalyId = 1;
    this.currentInsightId = 1;

    this.initializeMockData();
  }

  private initializeMockData() {
    // Create employees
    const employeesData = [
      {
        employeeId: "EMP-1247",
        name: "Sarah Chen",
        department: "Engineering",
        email: "sarah.chen@company.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b45a4b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        averageMonthlyOT: "18.3",
        performanceRating: "Excellent"
      },
      {
        employeeId: "EMP-2156",
        name: "Marcus Johnson",
        department: "Sales",
        email: "marcus.johnson@company.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        averageMonthlyOT: "12.5",
        performanceRating: "Good"
      },
      {
        employeeId: "EMP-3094",
        name: "Emma Rodriguez",
        department: "Marketing",
        email: "emma.rodriguez@company.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        averageMonthlyOT: "9.8",
        performanceRating: "Excellent"
      }
    ];

    employeesData.forEach(emp => {
      const employee: Employee = {
        id: this.currentEmployeeId++,
        ...emp
      };
      this.employees.set(employee.id, employee);
    });

    // Create anomalies
    const anomaliesData = [
      {
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
        detectedAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      },
      {
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
        detectedAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      },
      {
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
        detectedAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
        resolvedAt: new Date(Date.now() - 3 * 60 * 1000) // 3 minutes ago
      }
    ];

    anomaliesData.forEach(anom => {
      const anomaly: Anomaly = {
        id: this.currentAnomalyId++,
        employeeId: anom.employeeId,
        type: anom.type,
        description: anom.description,
        riskLevel: anom.riskLevel,
        amount: anom.amount,
        variance: anom.variance,
        confidence: anom.confidence,
        status: anom.status,
        payPeriod: anom.payPeriod,
        overtimeHours: anom.overtimeHours,
        normalOvertimeHours: anom.normalOvertimeHours,
        hourlyRate: anom.hourlyRate,
        detectedAt: anom.detectedAt,
        resolvedAt: (anom as any).resolvedAt || null
      };
      this.anomalies.set(anomaly.id, anomaly);
    });

    // Create AI insights
    const insightsData = [
      {
        anomalyId: 1,
        rootCause: "Project deadline pressure likely caused extended work hours. Similar pattern observed during Q3 product launch.",
        riskAssessment: "High probability of legitimate overtime. Low risk of fraudulent activity (8%).",
        recommendedActions: [
          "Approve with manager verification",
          "Request manager approval", 
          "Investigate further"
        ],
        historicalMatches: ["Similar pattern (Q3 2023) - 94% match", "Holiday overtime spike - 87% match"],
        confidence: 94
      },
      {
        anomalyId: 2,
        rootCause: "Duplicate payroll entries detected in system. Potential manual entry error during payroll processing.",
        riskAssessment: "Medium risk of overpayment. System error most likely cause rather than fraud.",
        recommendedActions: [
          "Review payroll entries",
          "Verify with HR department",
          "Implement additional validation"
        ],
        historicalMatches: ["Duplicate entry pattern (Oct 2024) - 91% match"],
        confidence: 87
      }
    ];

    insightsData.forEach(insight => {
      const aiInsight: AiInsight = {
        id: this.currentInsightId++,
        ...insight,
        historicalMatches: insight.historicalMatches || null
      };
      this.aiInsights.set(aiInsight.id, aiInsight);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployeeByEmployeeId(employeeId: string): Promise<Employee | undefined> {
    return Array.from(this.employees.values()).find(
      (employee) => employee.employeeId === employeeId,
    );
  }

  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const id = this.currentEmployeeId++;
    const newEmployee: Employee = { 
      ...employee, 
      id,
      avatar: employee.avatar || null,
      averageMonthlyOT: employee.averageMonthlyOT || null,
      performanceRating: employee.performanceRating || null
    };
    this.employees.set(id, newEmployee);
    return newEmployee;
  }

  async getAnomaly(id: number): Promise<Anomaly | undefined> {
    return this.anomalies.get(id);
  }

  async getAnomalyWithEmployee(id: number): Promise<AnomalyWithEmployee | undefined> {
    const anomaly = this.anomalies.get(id);
    if (!anomaly) return undefined;

    const employee = this.employees.get(anomaly.employeeId);
    if (!employee) return undefined;

    return { ...anomaly, employee };
  }

  async getAnomalyWithInsights(id: number): Promise<AnomalyWithInsights | undefined> {
    const anomaly = this.anomalies.get(id);
    if (!anomaly) return undefined;

    const employee = this.employees.get(anomaly.employeeId);
    if (!employee) return undefined;

    const aiInsight = Array.from(this.aiInsights.values()).find(
      insight => insight.anomalyId === anomaly.id
    );

    return { ...anomaly, employee, aiInsight };
  }

  async getAllAnomalies(): Promise<AnomalyWithEmployee[]> {
    const anomalies: AnomalyWithEmployee[] = [];
    
    const anomalyArray = Array.from(this.anomalies.values());
    for (const anomaly of anomalyArray) {
      const employee = this.employees.get(anomaly.employeeId);
      if (employee) {
        anomalies.push({ ...anomaly, employee });
      }
    }

    return anomalies.sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());
  }

  async getAnomaliesByRiskLevel(riskLevel: string): Promise<AnomalyWithEmployee[]> {
    const allAnomalies = await this.getAllAnomalies();
    return allAnomalies.filter(anomaly => anomaly.riskLevel === riskLevel);
  }

  async getAnomaliesByDepartment(department: string): Promise<AnomalyWithEmployee[]> {
    const allAnomalies = await this.getAllAnomalies();
    return allAnomalies.filter(anomaly => anomaly.employee.department === department);
  }

  async createAnomaly(anomaly: InsertAnomaly): Promise<Anomaly> {
    const id = this.currentAnomalyId++;
    const newAnomaly: Anomaly = {
      ...anomaly,
      id,
      detectedAt: new Date(),
      status: anomaly.status || "Under Review"
    };
    this.anomalies.set(id, newAnomaly);
    return newAnomaly;
  }

  async updateAnomalyStatus(id: number, status: string): Promise<Anomaly | undefined> {
    const anomaly = this.anomalies.get(id);
    if (!anomaly) return undefined;

    const updatedAnomaly: Anomaly = {
      ...anomaly,
      status,
      resolvedAt: status === "Resolved" ? new Date() : anomaly.resolvedAt
    };
    
    this.anomalies.set(id, updatedAnomaly);
    return updatedAnomaly;
  }

  async getAiInsight(anomalyId: number): Promise<AiInsight | undefined> {
    return Array.from(this.aiInsights.values()).find(
      insight => insight.anomalyId === anomalyId
    );
  }

  async createAiInsight(insight: InsertAiInsight): Promise<AiInsight> {
    const id = this.currentInsightId++;
    const newInsight: AiInsight = { 
      ...insight, 
      id,
      historicalMatches: insight.historicalMatches || null
    };
    this.aiInsights.set(id, newInsight);
    return newInsight;
  }

  async getDashboardStats() {
    const allAnomalies = await this.getAllAnomalies();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const criticalAnomalies = allAnomalies.filter(a => a.riskLevel === "Critical").length;
    const pendingReview = allAnomalies.filter(a => a.status === "Under Review").length;
    const resolvedToday = allAnomalies.filter(a => 
      a.status === "Resolved" && 
      a.resolvedAt && 
      new Date(a.resolvedAt) >= todayStart
    ).length;

    const amountAtRisk = allAnomalies
      .filter(a => a.status !== "Resolved")
      .reduce((sum, a) => sum + parseFloat(a.amount), 0)
      .toFixed(0);

    // Generate trends data for the last 14 days
    const trends = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Mock trend data that shows realistic patterns
      const baseValues = [12, 8, 15, 21, 18, 23, 19, 26, 31, 28, 34, 29, 37, 23];
      const critical = baseValues[i] || Math.floor(Math.random() * 20) + 10;
      const high = Math.floor(critical * 1.8) + Math.floor(Math.random() * 10);
      const medium = Math.floor(high * 1.6) + Math.floor(Math.random() * 15);

      trends.push({
        date: dateStr,
        critical,
        high,
        medium
      });
    }

    return {
      criticalAnomalies,
      pendingReview,
      resolvedToday,
      amountAtRisk: `$${parseInt(amountAtRisk).toLocaleString()}`,
      trends
    };
  }
}

export const storage = new MemStorage();
