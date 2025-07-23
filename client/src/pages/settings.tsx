import { useState } from "react";
import { Settings, User, Bell, Shield, Palette, Database, Bot, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    anomalyAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
    emailNotifications: true,
  });
  const [aiSettings, setAiSettings] = useState({
    sensitivityLevel: [75],
    autoAnalysis: true,
    confidenceThreshold: [80],
    realTimeMonitoring: true,
  });

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
                System Settings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure your LedgerIQ system preferences and security settings
              </p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="ai">AI Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.smith@company.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="est">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="est">Eastern Standard Time</SelectItem>
                            <SelectItem value="cst">Central Standard Time</SelectItem>
                            <SelectItem value="mst">Mountain Standard Time</SelectItem>
                            <SelectItem value="pst">Pacific Standard Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark theme for better visibility in low light
                        </p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dashboard-density">Dashboard Density</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Configure when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Anomaly Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive immediate alerts when new anomalies are detected
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.anomalyAlerts}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, anomalyAlerts: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly summary reports via email
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, weeklyReports: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about system maintenance and updates
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, systemUpdates: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable all email notifications
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, emailNotifications: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Engine Configuration
                    </CardTitle>
                    <CardDescription>
                      Adjust AI sensitivity and automation settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Anomaly Detection Sensitivity</Label>
                      <div className="px-2">
                        <Slider
                          value={aiSettings.sensitivityLevel}
                          onValueChange={(value) => 
                            setAiSettings({...aiSettings, sensitivityLevel: value})
                          }
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Conservative</span>
                        <span>{aiSettings.sensitivityLevel[0]}%</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Confidence Threshold</Label>
                      <div className="px-2">
                        <Slider
                          value={aiSettings.confidenceThreshold}
                          onValueChange={(value) => 
                            setAiSettings({...aiSettings, confidenceThreshold: value})
                          }
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Low</span>
                        <span>{aiSettings.confidenceThreshold[0]}%</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Analysis</Label>
                        <p className="text-sm text-muted-foreground">
                          Run continuous automated analysis on payroll data
                        </p>
                      </div>
                      <Switch 
                        checked={aiSettings.autoAnalysis}
                        onCheckedChange={(checked) => 
                          setAiSettings({...aiSettings, autoAnalysis: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Monitor payroll entries in real-time for immediate detection
                        </p>
                      </div>
                      <Switch 
                        checked={aiSettings.realTimeMonitoring}
                        onCheckedChange={(checked) => 
                          setAiSettings({...aiSettings, realTimeMonitoring: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      System Integrations
                    </CardTitle>
                    <CardDescription>
                      Configure connections to external systems and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Payroll System</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm text-green-600">Connected</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Primary payroll data source integration
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Configure</Button>
                          <Button size="sm" variant="outline">Test Connection</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">SMTP Server</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-sm text-amber-600">Needs Setup</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Email notification service configuration
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm">Setup</Button>
                          <Button size="sm" variant="outline">Documentation</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Slack Integration</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                            <span className="text-sm text-gray-600">Not Connected</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Send anomaly alerts to Slack channels
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm">Connect</Button>
                          <Button size="sm" variant="outline">Learn More</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Changes */}
            <div className="flex justify-end pt-6 border-t">
              <div className="flex gap-3">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}