import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot, Brain, TrendingUp, AlertCircle, CheckCircle, Clock, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { AiInsight } from "@shared/schema";

export default function AiInsightsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: insights, isLoading } = useQuery<AiInsight[]>({
    queryKey: ['/api/ai-insights'],
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive' as const;
      case 'medium': return 'secondary' as const;
      case 'low': return 'outline' as const;
      default: return 'outline' as const;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'implemented': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const mockMetrics = {
    totalInsights: insights?.length || 0,
    implementedSuggestions: insights?.filter(i => i.status === 'implemented').length || 0,
    averageConfidence: insights && insights.length > 0 ? insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length : 0,
    potentialSavings: 125000,
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
                AI Insights & Recommendations
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Machine learning analysis and intelligent recommendations for payroll optimization
              </p>
            </div>

            {/* AI Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Insights</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockMetrics.totalInsights}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Implemented</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockMetrics.implementedSuggestions}</div>
                  <p className="text-xs text-muted-foreground">
                    {((mockMetrics.implementedSuggestions / mockMetrics.totalInsights) * 100).toFixed(0)}% success rate
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {(mockMetrics.averageConfidence * 100).toFixed(0)}%
                  </div>
                  <Progress value={mockMetrics.averageConfidence * 100} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${mockMetrics.potentialSavings.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Annualized projection
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* AI Engine Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Engine Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Processing Efficiency</span>
                      <span className="text-sm text-green-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Model Accuracy</span>
                      <span className="text-sm text-blue-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Quality</span>
                      <span className="text-sm text-amber-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      AI Engine Active
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                    Last scan completed 2 minutes ago • Next scan in 8 minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Insights Tabs */}
            <Tabs defaultValue="recommendations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>
                      Intelligent suggestions based on pattern analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-muted rounded-lg" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {insights?.map((insight) => (
                          <div key={insight.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Lightbulb className="h-5 w-5 text-amber-500" />
                                <h3 className="font-semibold">{insight.title}</h3>
                                <Badge variant={getPriorityColor(insight.priority)}>
                                  {insight.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(insight.status)}
                                <span className="text-sm text-muted-foreground">
                                  {insight.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {insight.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                                <span>Impact: {insight.impact}</span>
                                <span>Generated: {new Date(insight.generatedAt).toLocaleDateString()}</span>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                                {insight.status === 'pending' && (
                                  <Button size="sm">
                                    Implement
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-12">
                            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No insights available</h3>
                            <p className="text-muted-foreground">
                              AI analysis is in progress. Check back soon for recommendations.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patterns" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pattern Analysis</CardTitle>
                    <CardDescription>
                      Detected patterns in payroll data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Overtime Spike Pattern</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Recurring overtime spikes detected in IT department during quarter-end periods.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: Every 3 months</span>
                          <span>Departments: IT, Finance</span>
                          <span>Confidence: 92%</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Weekend Work Anomaly</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Unusual weekend work patterns indicating potential time fraud or system errors.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: Irregular</span>
                          <span>Risk Level: High</span>
                          <span>Confidence: 78%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="predictions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Analysis</CardTitle>
                    <CardDescription>
                      AI predictions for upcoming payroll trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Next Quarter Forecast</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Expected 15% increase in overtime costs due to upcoming project deadlines.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Timeframe: Next 90 days</span>
                          <span>Probability: 84%</span>
                          <span>Impact: $45,000</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Anomaly Risk Prediction</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          High probability of payroll anomalies in Sales department next month.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Department: Sales</span>
                          <span>Risk Level: High</span>
                          <span>Confidence: 91%</span>
                        </div>
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