import { 
  BarChart3, 
  AlertTriangle, 
  Bot, 
  Users, 
  FileText, 
  Settings, 
  CheckCircle 
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Anomalies", href: "/anomalies", icon: AlertTriangle },
  { name: "AI Insights", href: "/ai-insights", icon: Bot },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed bg-card border-r border-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full px-3 py-6 overflow-y-auto pt-20">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-muted"
                  )}
                  onClick={onClose}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
        
        {/* AI Status Panel */}
        <div className="mt-8 p-4 bg-info bg-opacity-10 rounded-lg border border-info border-opacity-20">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-success rounded-full mr-2" />
            <span className="text-sm font-medium">AI Engine Status</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Active • Last scan: 2 min ago
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Processing efficiency</span>
              <span>87%</span>
            </div>
            <Progress value={87} className="h-1" />
          </div>
          
          <div className="mt-3 pt-3 border-t border-info border-opacity-20">
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 mr-1 text-success" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}