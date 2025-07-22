import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface TrendsChartProps {
  data?: Array<{
    date: string;
    critical: number;
    high: number;
    medium: number;
  }>;
  isLoading: boolean;
}

export default function TrendsChart({ data, isLoading }: TrendsChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Anomaly Trends</CardTitle>
            <Skeleton className="h-8 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No trend data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Anomaly Trends</CardTitle>
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-muted-foreground"
                fontSize={12}
              />
              <YAxis 
                className="text-muted-foreground"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="critical"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
                name="Critical Anomalies"
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2 }}
                name="High Priority"
              />
              <Line
                type="monotone"
                dataKey="medium"
                stroke="hsl(var(--info))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--info))", strokeWidth: 2 }}
                name="Medium Priority"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}