import { AlertTriangle, Clock, CheckCircle, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryCardsProps {
  data?: {
    criticalAnomalies: number;
    pendingReview: number;
    resolvedToday: number;
    amountAtRisk: string;
  };
  isLoading: boolean;
}

export default function SummaryCards({ data, isLoading }: SummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const cards = [
    {
      title: "Critical Anomalies",
      value: data.criticalAnomalies,
      icon: AlertTriangle,
      iconBg: "bg-destructive bg-opacity-10",
      iconColor: "text-destructive",
      change: "+12%",
      changeColor: "text-destructive",
      trend: "from last week"
    },
    {
      title: "Pending Review",
      value: data.pendingReview,
      icon: Clock,
      iconBg: "bg-warning bg-opacity-10",
      iconColor: "text-warning",
      change: "-3%",
      changeColor: "text-warning",
      trend: "from last week"
    },
    {
      title: "Resolved Today",
      value: data.resolvedToday,
      icon: CheckCircle,
      iconBg: "bg-success bg-opacity-10",
      iconColor: "text-success",
      change: "+18%",
      changeColor: "text-success",
      trend: "from last week"
    },
    {
      title: "Amount at Risk",
      value: data.amountAtRisk,
      icon: DollarSign,
      iconBg: "bg-info bg-opacity-10",
      iconColor: "text-info",
      change: "+8%",
      changeColor: "text-destructive",
      trend: "from last week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${card.iconBg} rounded-lg p-2`}>
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {card.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span className={`font-medium ${card.changeColor}`}>
                    {card.change}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {card.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}