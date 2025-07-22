import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import SummaryCards from "@/components/dashboard/summary-cards";
import TrendsChart from "@/components/dashboard/trends-chart";
import AiInsights from "@/components/dashboard/ai-insights";
import AnomalyTable from "@/components/dashboard/anomaly-table";
import AnomalyModal from "@/components/dashboard/anomaly-modal";
import type { AnomalyWithEmployee } from "@shared/schema";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    riskLevel: "All Risk Levels",
    department: "All Departments"
  });

  const { data: dashboardStats, isLoading: statsLoading } = useQuery<{
    criticalAnomalies: number;
    pendingReview: number;
    resolvedToday: number;
    amountAtRisk: string;
    trends: Array<{ date: string; critical: number; high: number; medium: number; }>;
  }>({
    queryKey: ['/api/dashboard/stats'],
  });

  const { data: anomalies, isLoading: anomaliesLoading } = useQuery<AnomalyWithEmployee[]>({
    queryKey: ['/api/anomalies', filters.riskLevel, filters.department],
  });

  const handleAnomalySelect = (anomalyId: number) => {
    setSelectedAnomalyId(anomalyId);
  };

  const handleModalClose = () => {
    setSelectedAnomalyId(null);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="dashboard-layout">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="dashboard-main overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-foreground">
                Payroll Anomaly Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor and analyze payroll irregularities with AI-powered insights
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards 
              data={dashboardStats} 
              isLoading={statsLoading} 
            />

            {/* Charts and AI Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <TrendsChart 
                  data={dashboardStats?.trends || []} 
                  isLoading={statsLoading} 
                />
              </div>
              
              <AiInsights />
            </div>

            {/* Anomaly Table */}
            <AnomalyTable
              data={anomalies}
              isLoading={anomaliesLoading}
              onAnomalySelect={handleAnomalySelect}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </main>
      </div>

      {/* Anomaly Detail Modal */}
      {selectedAnomalyId && (
        <AnomalyModal
          anomalyId={selectedAnomalyId}
          onClose={handleModalClose}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
