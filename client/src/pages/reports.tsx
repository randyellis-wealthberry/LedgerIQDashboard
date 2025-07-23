import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportType, setReportType] = useState("anomaly");
  const [dateRange, setDateRange] = useState({ from: new Date(2024, 0, 1), to: new Date() });
  const [department, setDepartment] = useState("all");

  const mockReports = [
    {
      id: 1,
      name: "Monthly Anomaly Summary",
      type: "Anomaly Report",
      department: "All Departments",
      dateGenerated: "2024-01-15",
      status: "completed",
      fileSize: "2.4 MB",
      description: "Comprehensive analysis of all detected anomalies for January 2024"
    },
    {
      id: 2,
      name: "IT Department Overtime Analysis",
      type: "Department Report",
      department: "IT",
      dateGenerated: "2024-01-14",
      status: "completed",
      fileSize: "1.8 MB",
      description: "Detailed overtime patterns and cost analysis for IT department"
    },
    {
      id: 3,
      name: "AI Insights Performance Report",
      type: "AI Report",
      department: "All Departments",
      dateGenerated: "2024-01-13",
      status: "generating",
      fileSize: "Pending",
      description: "AI model performance metrics and recommendation accuracy"
    },
    {
      id: 4,
      name: "Payroll Compliance Audit",
      type: "Compliance Report",
      department: "All Departments",
      dateGenerated: "2024-01-12",
      status: "completed",
      fileSize: "5.2 MB",
      description: "Full compliance audit report with regulatory requirements"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'secondary' as const;
      case 'generating': return 'destructive' as const;
      case 'failed': return 'destructive' as const;
      default: return 'secondary' as const;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'anomaly report': return <BarChart3 className="h-4 w-4" />;
      case 'department report': return <PieChart className="h-4 w-4" />;
      case 'ai report': return <TrendingUp className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Reports & Analytics
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate and manage payroll analysis reports
                </p>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            {/* Report Generation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>
                  Create custom reports based on your specific requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anomaly">Anomaly Report</SelectItem>
                      <SelectItem value="department">Department Analysis</SelectItem>
                      <SelectItem value="ai">AI Insights Report</SelectItem>
                      <SelectItem value="compliance">Compliance Audit</SelectItem>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="col-span-1 md:col-span-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Select Date Range
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Reports Tabs */}
            <Tabs defaultValue="recent" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Recent Reports</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>
                      Your latest generated reports and analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReports.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {getTypeIcon(report.type)}
                                <h3 className="font-semibold">{report.name}</h3>
                                <Badge variant={getStatusColor(report.status)}>
                                  {report.status}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {report.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Type: {report.type}</span>
                                <span>Department: {report.department}</span>
                                <span>Generated: {new Date(report.dateGenerated).toLocaleDateString()}</span>
                                <span>Size: {report.fileSize}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 ml-4">
                              {report.status === 'completed' && (
                                <Button size="sm" variant="outline">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scheduled" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>
                      Automated reports that run on a regular schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Weekly Anomaly Summary</h3>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Automated weekly summary of all detected anomalies
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: Weekly (Monday)</span>
                          <span>Recipients: management@company.com</span>
                          <span>Next run: Jan 22, 2024</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Monthly Compliance Report</h3>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Monthly compliance audit report for regulatory requirements
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: Monthly (1st)</span>
                          <span>Recipients: compliance@company.com</span>
                          <span>Next run: Feb 1, 2024</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Templates</CardTitle>
                    <CardDescription>
                      Pre-configured report templates for quick generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4" />
                          <h3 className="font-semibold">Anomaly Analysis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Comprehensive analysis of detected anomalies with risk assessment
                        </p>
                        <Button size="sm" className="w-full">Use Template</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <PieChart className="h-4 w-4" />
                          <h3 className="font-semibold">Department Summary</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Department-specific payroll analysis and metrics
                        </p>
                        <Button size="sm" className="w-full">Use Template</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4" />
                          <h3 className="font-semibold">Executive Dashboard</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          High-level overview for executive leadership
                        </p>
                        <Button size="sm" className="w-full">Use Template</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}