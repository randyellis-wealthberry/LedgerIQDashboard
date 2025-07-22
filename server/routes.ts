import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Get all anomalies
  app.get("/api/anomalies", async (req, res) => {
    try {
      const { riskLevel, department } = req.query;
      
      let anomalies;
      if (riskLevel && riskLevel !== "All Risk Levels") {
        anomalies = await storage.getAnomaliesByRiskLevel(riskLevel as string);
      } else if (department && department !== "All Departments") {
        anomalies = await storage.getAnomaliesByDepartment(department as string);
      } else {
        anomalies = await storage.getAllAnomalies();
      }
      
      res.json(anomalies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch anomalies" });
    }
  });

  // Get single anomaly with insights
  app.get("/api/anomalies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const anomaly = await storage.getAnomalyWithInsights(id);
      
      if (!anomaly) {
        return res.status(404).json({ error: "Anomaly not found" });
      }
      
      res.json(anomaly);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch anomaly" });
    }
  });

  // Update anomaly status
  app.patch("/api/anomalies/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      const statusSchema = z.object({
        status: z.enum(["Under Review", "Investigating", "Resolved"])
      });

      const validatedData = statusSchema.parse({ status });
      
      const updatedAnomaly = await storage.updateAnomalyStatus(id, validatedData.status);
      
      if (!updatedAnomaly) {
        return res.status(404).json({ error: "Anomaly not found" });
      }
      
      res.json(updatedAnomaly);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid status value" });
      } else {
        res.status(500).json({ error: "Failed to update anomaly status" });
      }
    }
  });

  // Get all employees
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
