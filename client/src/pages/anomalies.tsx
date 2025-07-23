import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Filter, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { AnomalyWithEmployee } from "@shared/schema";

export default function AnomaliesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const { data: anomalies, isLoading } = useQuery<AnomalyWithEmployee[]>({
    queryKey: ['/api/anomalies', 'All Risk Levels', 'All Departments'],
  });

  const filteredAnomalies = anomalies?.filter(anomaly => {
    const matchesSearch = anomaly.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || anomaly.status === statusFilter;
    const matchesRisk = riskFilter === "all" || anomaly.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  }) || [];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'critical': return 'destructive' as const;
      case 'high': return 'destructive' as const;
      case 'medium': return 'secondary' as const;
      default: return 'outline' as const;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'secondary' as const;
      case 'in_progress': return 'destructive' as const;
      case 'pending': return 'outline' as const;
      default: return 'outline' as const;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const anomaliesByRisk = {
    critical: filteredAnomalies.filter(a => a.riskLevel === 'Critical').length,
    high: filteredAnomalies.filter(a => a.riskLevel === 'High').length,
    medium: filteredAnomalies.filter(a => a.riskLevel === 'Medium').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="dashboard-layout">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
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
                Anomaly Management
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Investigate and manage detected payroll anomalies
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Anomalies</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredAnomalies.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {getTrendIcon('stable')} No change from yesterday
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical</CardTitle>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{anomaliesByRisk.critical}</div>
                  <p className="text-xs text-muted-foreground">
                    {getTrendIcon('increasing')} +2 from yesterday
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{anomaliesByRisk.high}</div>
                  <p className="text-xs text-muted-foreground">
                    {getTrendIcon('stable')} No change
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{anomaliesByRisk.medium}</div>
                  <p className="text-xs text-muted-foreground">
                    {getTrendIcon('decreasing')} -1 from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Filter & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by employee name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Anomalies List */}
            <Card>
              <CardHeader>
                <CardTitle>Detected Anomalies</CardTitle>
                <CardDescription>
                  {filteredAnomalies.length} anomalies found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-muted rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAnomalies.map((anomaly) => (
                      <div key={anomaly.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{anomaly.employee.name}</h3>
                              <Badge variant={getRiskColor(anomaly.riskLevel)}>
                                {anomaly.riskLevel}
                              </Badge>
                              <Badge variant={getStatusColor(anomaly.status)}>
                                {anomaly.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {anomaly.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Department: {anomaly.employee.department}</span>
                              <span>Amount: ${anomaly.amount.toLocaleString()}</span>
                              <span>Detected: {new Date(anomaly.detectedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-sm font-medium">
                              Confidence: {(anomaly.confidence * 100).toFixed(0)}%
                            </div>
                            <Button size="sm" variant="outline">
                              Investigate
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredAnomalies.length === 0 && (
                      <div className="text-center py-12">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No anomalies found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search terms or filters.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}