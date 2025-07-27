import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Search, Filter, Plus, Edit, Trash2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Employee } from "@/lib/mock-data";

export default function EmployeesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: employees, isLoading } = useQuery<Employee[]>({
    queryKey: ['/api/employees'],
  });

  const filteredEmployees = employees?.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || (employee.status || "active") === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'secondary' as const;
      case 'inactive': return 'outline' as const;
      case 'terminated': return 'destructive' as const;
      default: return 'outline' as const;
    }
  };

  const departments = Array.from(new Set(employees?.map(e => e.department) || []));
  const totalEmployees = employees?.length || 0;
  const activeEmployees = employees?.filter(e => (e.status || "active") === 'active').length || 0;
  const averageSalary = employees && employees.length > 0 ? employees.reduce((acc, e) => acc + (e.salary || 0), 0) / employees.length : 0;

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
                  Employee Management
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage employee information and payroll data
                </p>
              </div>
              <Button className="mt-4 sm:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 new this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active</CardTitle>
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
                  <p className="text-xs text-muted-foreground">
                    {((activeEmployees / totalEmployees) * 100).toFixed(0)}% of total
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Departments</CardTitle>
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Across organization
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    ${averageSalary.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Annual base salary
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or employee ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Employee Table */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  {filteredEmployees.length} employees found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-muted rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Salary</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEmployees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.employeeId}`} />
                                  <AvatarFallback>
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{employee.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {employee.email}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    ID: {employee.employeeId}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{employee.department}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{employee.position || "Staff"}</div>
                              <div className="text-sm text-muted-foreground">
                                Started: {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "N/A"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                ${(employee.salary || 0).toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${Math.round((employee.salary || 0) / 12).toLocaleString()}/month
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(employee.status || "active")}>
                                {employee.status || "active"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {filteredEmployees.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No employees found</h3>
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