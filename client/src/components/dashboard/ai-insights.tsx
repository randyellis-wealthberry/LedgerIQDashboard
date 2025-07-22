import { Bot, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    type: "warning",
    title: "Overtime Pattern Alert",
    description: "Unusual overtime patterns detected in Engineering dept. 34% above normal.",
    action: "View Details"
  },
  {
    type: "error",
    title: "Duplicate Payment Risk",
    description: "3 potential duplicate payments flagged. Total amount: $45,230",
    action: "Investigate"
  },
  {
    type: "success",
    title: "Cost Optimization",
    description: "AI suggests 12% cost reduction through optimized scheduling.",
    action: "Learn More"
  }
];

const historicalMatches = [
  { pattern: "Similar pattern (Q3 2023)", match: "94% match" },
  { pattern: "Holiday overtime spike", match: "87% match" }
];

export default function AiInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="w-6 h-6 bg-info bg-opacity-10 rounded-full flex items-center justify-center mr-2">
            <Bot className="h-4 w-4 text-info" />
          </div>
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border-l-4 pl-4 ${
              insight.type === "warning"
                ? "border-warning"
                : insight.type === "error"
                ? "border-destructive"
                : "border-success"
            }`}
          >
            <h4 className="text-sm font-medium text-foreground mb-1">
              {insight.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              {insight.description}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-info hover:text-info hover:bg-opacity-80 p-0 h-auto"
            >
              {insight.action} →
            </Button>
          </div>
        ))}

        {/* Historical Matches */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Historical Matches
          </h4>
          <div className="space-y-2">
            {historicalMatches.map((match, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{match.pattern}</span>
                <Badge variant="secondary" className="text-xs">
                  {match.match}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* AI Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <CheckCircle className="h-3 w-3 text-success mr-1" />
              <span>AI Analysis Complete</span>
            </div>
            <span className="text-muted-foreground">2 mins ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}