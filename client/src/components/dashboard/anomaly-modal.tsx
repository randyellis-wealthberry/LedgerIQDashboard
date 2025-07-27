import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { AnomalyWithInsights } from "@/lib/mock-data";

interface AnomalyModalProps {
  anomalyId: number;
  onClose: () => void;
}

const formatCurrency = (amount: string) => {
  return `$${parseFloat(amount).toLocaleString()}`;
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  }
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};

export default function AnomalyModal({ anomalyId, onClose }: AnomalyModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: anomaly, isLoading } = useQuery<AnomalyWithInsights>({
    queryKey: ['/api/anomalies', anomalyId],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      return apiRequest('PATCH', `/api/anomalies/${anomalyId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/anomalies'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({
        title: "Status Updated",
        description: "Anomaly status has been updated successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update anomaly status. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (status: string) => {
    updateStatusMutation.mutate(status);
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-4xl">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-6" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!anomaly) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-4xl">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Anomaly not found</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "Critical":
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "High":
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-info" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Critical":
        return "text-destructive";
      case "High":
        return "text-warning";
      default:
        return "text-info";
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getRiskIcon(anomaly.riskLevel)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {anomaly.riskLevel} {anomaly.type}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detected {formatTimeAgo(anomaly.detectedAt)} • Employee: {anomaly.employee.name}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Risk Level</div>
                    <div className={cn("text-lg font-semibold", getRiskColor(anomaly.riskLevel))}>
                      {anomaly.riskLevel}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Amount Impact</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(anomaly.amount)}
                    </div>
                  </CardContent>
                </Card>
                {anomaly.variance && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Variance</div>
                      <div className="text-lg font-semibold text-warning">
                        {anomaly.variance}
                      </div>
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Confidence</div>
                    <div className="text-lg font-semibold text-success">
                      {anomaly.confidence}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Employee and Anomaly Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Employee & Anomaly Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={anomaly.employee.avatar || ""} />
                      <AvatarFallback>
                        {anomaly.employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{anomaly.employee.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {anomaly.employee.employeeId} • {anomaly.employee.department}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pay Period:</span>
                      <span>{anomaly.payPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Anomaly Type:</span>
                      <span>{anomaly.type}</span>
                    </div>
                    {anomaly.overtimeHours && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overtime Hours:</span>
                        <span>{anomaly.overtimeHours} hours</span>
                      </div>
                    )}
                    {anomaly.normalOvertimeHours && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Normal OT:</span>
                        <span>{anomaly.normalOvertimeHours} hours</span>
                      </div>
                    )}
                    {anomaly.hourlyRate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hourly Rate:</span>
                        <span>${anomaly.hourlyRate}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border",
                          anomaly.status === "Resolved" ? "status-resolved" :
                          anomaly.status === "Investigating" ? "status-investigating" :
                          "status-under-review"
                        )}
                      >
                        {anomaly.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
                      <div>
                        <div className="text-sm font-medium">Anomaly detected</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(anomaly.detectedAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                      <div>
                        <div className="text-sm font-medium">Payroll processing initiated</div>
                        <div className="text-xs text-muted-foreground">
                          {anomaly.payPeriod}
                        </div>
                      </div>
                    </div>

                    {anomaly.resolvedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <div className="text-sm font-medium">Anomaly resolved</div>
                          <div className="text-xs text-muted-foreground">
                            {formatTimeAgo(anomaly.resolvedAt)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights Sidebar */}
            <div className="space-y-6">
              {anomaly.aiInsight && (
                <>
                  <Card className="bg-info bg-opacity-5 border-info border-opacity-20">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <TrendingUp className="h-4 w-4 text-info mr-2" />
                        AI Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <div className="font-medium text-foreground mb-1">Root Cause</div>
                        <div className="text-muted-foreground">
                          {anomaly.aiInsight.rootCause}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Risk Assessment</div>
                        <div className="text-muted-foreground">
                          {anomaly.aiInsight.riskAssessment}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {anomaly.aiInsight.recommendedActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto p-3"
                          onClick={() => {
                            if (action.includes("Approve")) {
                              handleStatusUpdate("Resolved");
                            } else if (action.includes("Investigate")) {
                              handleStatusUpdate("Investigating");
                            }
                          }}
                          disabled={updateStatusMutation.isPending}
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-success flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {anomaly.aiInsight.historicalMatches && anomaly.aiInsight.historicalMatches.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Historical Context</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg Monthly OT:</span>
                            <span>{anomaly.employee.averageMonthlyOT} hrs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Performance:</span>
                            <span className="text-success">{anomaly.employee.performanceRating}</span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-border">
                          <div className="text-sm font-medium mb-2">Historical Matches</div>
                          <div className="space-y-1">
                            {anomaly.aiInsight.historicalMatches.map((match, index) => (
                              <div key={index} className="text-xs text-muted-foreground">
                                {match}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            {anomaly.status !== "Resolved" && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => handleStatusUpdate("Investigating")}
                  disabled={updateStatusMutation.isPending}
                >
                  Mark as Investigating
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("Resolved")}
                  disabled={updateStatusMutation.isPending}
                >
                  Resolve Anomaly
                </Button>
              </>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}