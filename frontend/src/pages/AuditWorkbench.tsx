import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { RiskHeatMap } from "@/components/map/RiskHeatMap";
import { SmartIngestPortal } from "@/components/ingest/SmartIngestPortal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, FileStack, Upload } from "lucide-react";
import { getAuditTasks, type AuditTask } from "@/services/mockAuditWorkbenchApi";

export default function AuditWorkbench() {
  const [activeTab, setActiveTab] = useState("map");
  const [tasks, setTasks] = useState<AuditTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuditTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setTasks([]);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchTasks();
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Workbench Header */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Audit Workbench</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Intelligence console for project monitoring and evidence generation
              </p>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="glass-panel">
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Risk Heat Map
                </TabsTrigger>
                <TabsTrigger value="cards" className="flex items-center gap-2">
                  <FileStack className="w-4 h-4" />
                  Audit Cards
                </TabsTrigger>
                <TabsTrigger value="ingest" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Smart Ingest
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "map" && (
            <RiskHeatMap />
          )}

          {activeTab === "cards" && (
            <div className="h-full overflow-auto p-6">
              <div className="max-w-6xl mx-auto">
                {loading && <LoadingState />}
                
                {error && !loading && (
                  <ErrorState error={error} onRetry={handleRetry} isRetrying={retrying} />
                )}

                {!loading && !error && (
                  <>
                    <div className="mb-6">
                      <h2 className="section-header">Active Audit Dockets</h2>
                      <p className="text-sm text-muted-foreground">
                        Hover over satellite thumbnails to initiate visual analysis scan
                      </p>
                    </div>

                    {tasks.length === 0 && <EmptyState />}

                    {tasks.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                          <div 
                            key={task.id}
                            className="glass-panel p-5 hover:bg-accent/30 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="font-medium text-lg">{task.projectName}</h3>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                                task.status === 'pending' ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200' :
                                task.status === 'in-progress' ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200' :
                                task.status === 'completed' ? 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-200' :
                                'bg-gray-100 text-gray-900 dark:bg-gray-900/20 dark:text-gray-200'
                              }`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>County: <span className="text-foreground font-medium">{task.county}</span></span>
                              <span className="font-mono">{task.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "ingest" && (
            <div className="h-full overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                <SmartIngestPortal />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
