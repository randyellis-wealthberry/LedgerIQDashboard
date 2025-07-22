import { useState } from "react";
import { ArrowUpDown, Download, Eye, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { AnomalyWithEmployee } from "@shared/schema";

interface AnomalyTableProps {
  data?: AnomalyWithEmployee[];
  isLoading: boolean;
  onAnomalySelect: (anomalyId: number) => void;
  filters: {
    riskLevel: string;
    department: string;
  };
  onFilterChange: (filters: { riskLevel: string; department: string }) => void;
}

const getRiskBadgeClass = (riskLevel: string) => {
  switch (riskLevel) {
    case "Critical":
      return "risk-critical";
    case "High":
      return "risk-high";
    case "Medium":
      return "risk-medium";
    case "Low":
      return "risk-low";
    default:
      return "risk-low";
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Resolved":
      return "status-resolved";
    case "Investigating":
      return "status-investigating";
    case "Under Review":
      return "status-under-review";
    default:
      return "status-under-review";
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) {
    return `${diffMins} mins ago`;
  }
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};

export default function AnomalyTable({
  data,
  isLoading,
  onAnomalySelect,
  filters,
  onFilterChange
}: AnomalyTableProps) {
  const [sortField, setSortField] = useState<keyof AnomalyWithEmployee | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof AnomalyWithEmployee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = data ? [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    
    if (sortField === 'detectedAt') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    }
    
    if (aVal === null || aVal === undefined) aVal = "";
    if (bVal === null || bVal === undefined) bVal = "";
    
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  }) : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Anomaly Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Live Anomaly Feed</CardTitle>
          <div className="mt-3 sm:mt-0 flex items-center space-x-3">
            <Select
              value={filters.riskLevel}
              onValueChange={(value) =>
                onFilterChange({ ...filters, riskLevel: value })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Risk Levels">All Risk Levels</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.department}
              onValueChange={(value) =>
                onFilterChange({ ...filters, department: value })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Departments">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Employee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Anomaly Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("riskLevel")}
                >
                  <div className="flex items-center">
                    Risk Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("detectedAt")}
                >
                  <div className="flex items-center">
                    Detected
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((anomaly) => (
                <TableRow
                  key={anomaly.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onAnomalySelect(anomaly.id)}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={anomaly.employee.avatar || ""} />
                        <AvatarFallback>
                          {anomaly.employee.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="text-sm font-medium">
                          {anomaly.employee.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {anomaly.employee.department}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{anomaly.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {anomaly.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border",
                        getRiskBadgeClass(anomaly.riskLevel)
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1",
                        anomaly.riskLevel === "Critical" ? "bg-destructive" :
                        anomaly.riskLevel === "High" ? "bg-warning" :
                        anomaly.riskLevel === "Medium" ? "bg-info" : "bg-muted-foreground"
                      )} />
                      {anomaly.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    ${parseFloat(anomaly.amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTimeAgo(anomaly.detectedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border",
                        getStatusBadgeClass(anomaly.status)
                      )}
                    >
                      {anomaly.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnomalySelect(anomaly.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {anomaly.status !== "Resolved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle resolve action
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {Math.min(10, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
