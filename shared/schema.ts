import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull(),
  position: text("position").notNull(),
  salary: integer("salary").notNull(),
  hireDate: timestamp("hire_date").notNull().defaultNow(),
  status: text("status").notNull().default("active"),
  avatar: text("avatar"),
  averageMonthlyOT: decimal("average_monthly_ot", { precision: 5, scale: 2 }).default("0"),
  performanceRating: text("performance_rating").default("Good"),
});

export const anomalies = pgTable("anomalies", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").references(() => employees.id).notNull(),
  type: text("type").notNull(), // "Overtime Spike", "Duplicate Entry", "Rate Variance", etc.
  description: text("description").notNull(),
  riskLevel: text("risk_level").notNull(), // "Critical", "High", "Medium", "Low"
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  variance: text("variance"), // e.g., "+287%", "+15%"
  confidence: integer("confidence").notNull(), // 0-100
  status: text("status").notNull().default("Under Review"), // "Under Review", "Investigating", "Resolved"
  detectedAt: timestamp("detected_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  payPeriod: text("pay_period").notNull(),
  overtimeHours: decimal("overtime_hours", { precision: 5, scale: 2 }),
  normalOvertimeHours: decimal("normal_overtime_hours", { precision: 5, scale: 2 }),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }),
});

export const aiInsights = pgTable("ai_insights", {
  id: serial("id").primaryKey(),
  anomalyId: integer("anomaly_id").references(() => anomalies.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull().default("medium"), // "high", "medium", "low"
  status: text("status").notNull().default("pending"), // "pending", "in_progress", "implemented"
  impact: text("impact").notNull().default("medium"), // "high", "medium", "low"
  rootCause: text("root_cause").notNull(),
  riskAssessment: text("risk_assessment").notNull(),
  recommendedActions: text("recommended_actions").array().notNull(),
  historicalMatches: text("historical_matches").array(),
  confidence: integer("confidence").notNull(), // 0-100
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
});

export const insertAnomalySchema = createInsertSchema(anomalies).omit({
  id: true,
  detectedAt: true,
});

export const insertAiInsightSchema = createInsertSchema(aiInsights).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;
export type InsertAnomaly = z.infer<typeof insertAnomalySchema>;
export type Anomaly = typeof anomalies.$inferSelect;
export type InsertAiInsight = z.infer<typeof insertAiInsightSchema>;
export type AiInsight = typeof aiInsights.$inferSelect;

export interface AnomalyWithEmployee extends Anomaly {
  employee: Employee;
}

export interface AnomalyWithInsights extends AnomalyWithEmployee {
  aiInsight?: AiInsight;
}
