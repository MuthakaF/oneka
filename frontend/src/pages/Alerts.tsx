import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { AlertDetail } from "@/components/AlertDetail";
import { 
  AlertTriangle, 
  Clock, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  User,
  Building
} from "lucide-react";
import { useState, useEffect } from "react";
import { getAuditFlags, type AuditFlag } from "@/services/mockAlertsApi";

const statusLabels: Record<string, { label: string; color: string }> = {
  open: { label: "Open", color: "text-status-amber" },
  investigating: { label: "Investigating", color: "text-chart-1" },
  resolved: { label: "Resolved", color: "text-status-green" },
};

const severityColors: Record<string, string> = {
  critical: "bg-status-red",
  high: "bg-status-red",
  medium: "bg-status-amber",
  low: "bg-status-green",
};

export default function Alerts() {
  const [flags, setFlags] = useState<AuditFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuditFlags();
      setFlags(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setFlags([]);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchFlags();
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audit Flags</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Risk Indicators and Anomaly Notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && (
          <ErrorState error={error} onRetry={handleRetry} isRetrying={retrying} />
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-status-red" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">High Risk</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {flags.filter(f => f.severity === 'high' || f.severity === 'critical').length}
                </p>
              </div>
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-status-amber" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Review</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {flags.filter(f => f.status === 'open').length}
                </p>
              </div>
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-chart-1" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Investigating</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {flags.filter(f => f.status === 'investigating').length}
                </p>
              </div>
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resolved</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {flags.filter(f => f.status === 'resolved').length}
                </p>
              </div>
            </div>

            {/* Empty State */}
            {flags.length === 0 && <EmptyState />}

            {/* Alerts List */}
            {flags.length > 0 && (
              <div className="space-y-3">
                {flags.map((flag) => (
                  <div 
                    key={flag.id}
                    className="glass-panel p-5 hover:bg-accent/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      {/* Severity Indicator */}
                      <div className={`w-1 h-full min-h-[80px] rounded-full ${severityColors[flag.severity]}`} />

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-sm text-muted-foreground">{flag.id}</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                flag.severity === 'critical' ? 'bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-200' :
                                flag.severity === 'high' ? 'bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-200' :
                                flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200' :
                                'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-200'
                              }`}>
                                {flag.severity}
                              </span>
                              <span className={`text-xs font-medium ${statusLabels[flag.status].color}`}>
                                {statusLabels[flag.status].label}
                              </span>
                            </div>
                            <h3 className="font-medium">{flag.projectName}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                              <Building className="w-3 h-3" />
                              {flag.county}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span className="font-mono">{new Date(flag.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{flag.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            <span>Project ID: <span className="text-foreground font-mono">{flag.projectId}</span></span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {flag.status !== 'resolved' && (
                              <>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border border-border hover:bg-accent transition-colors">
                                  <XCircle className="w-3 h-3" />
                                  Dismiss
                                </button>
                                <button 
                                  onClick={() => setSelectedFlagId(flag.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-accent hover:bg-accent/80 transition-colors"
                                >
                                  Review
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </>
                            )}
                            {flag.status === 'resolved' && (
                              <span className="flex items-center gap-1.5 text-xs text-status-green">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified & Closed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Legal Reference */}
            <div className="text-xs text-muted-foreground">
              <span className="legal-ref">
                Audit flags generated per Risk-Based Auditing (RBA) methodology • PFM Act 2012
              </span>
            </div>
          </>
        )}

        {/* Alert Detail Modal */}
        {selectedFlagId && (
          <AlertDetail flagId={selectedFlagId} onClose={() => setSelectedFlagId(null)} />
        )}
      </div>
    </AppLayout>
  );
}
