import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  mockDashboardStats, 
  mockAnomaliesWithEmployees, 
  mockAnomaliesWithInsights,
  mockEmployees,
  mockAiInsights,
  type AnomalyWithEmployee,
  type AnomalyWithInsights
} from "./mock-data";

// Mock data resolver function that simulates API responses
const resolveMockData = (queryKey: readonly (string | number | object)[]): any => {
  const key = queryKey.join("/");
  
  // Dashboard stats
  if (key === "/api/dashboard/stats") {
    return mockDashboardStats;
  }
  
  // Anomalies with filtering
  if (key.startsWith("/api/anomalies")) {
    const parts = key.split("/");
    if (parts.length === 3) {
      // GET /api/anomalies - return all anomalies
      return mockAnomaliesWithEmployees;
    } else if (parts.length === 4) {
      // GET /api/anomalies/:id - return specific anomaly with insights
      const id = parseInt(parts[3]);
      return mockAnomaliesWithInsights.find(a => a.id === id);
    }
    // Handle filtered requests - this would be enhanced based on filter params
    return mockAnomaliesWithEmployees;
  }
  
  // Employees
  if (key === "/api/employees") {
    return mockEmployees;
  }
  
  // AI Insights
  if (key === "/api/ai-insights") {
    return mockAiInsights;
  }
  
  // Default to empty response
  return null;
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Simulate API response with mock data
  const mockResponse = {
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => resolveMockData([url]),
    text: async () => JSON.stringify(resolveMockData([url]))
  };
  
  return mockResponse as Response;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Simulate loading delay for better UX demo
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data based on query key
    return resolveMockData(queryKey as readonly (string | number | object)[]);
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
