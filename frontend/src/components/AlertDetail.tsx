import { useState, useEffect } from "react";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { 
  X, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Building,
  CheckCircle2,
  Clock
} from "lucide-react";
import { getAuditFlagById, updateAuditFlagStatus, type AuditFlag } from "@/services/mockAlertsApi";

interface AlertDetailProps {
  flagId: string;
  onClose: () => void;
}

const statusColors: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: "Open", color: "text-status-amber", bg: "bg-amber-100 dark:bg-amber-900/20" },
  investigating: { label: "Investigating", color: "text-chart-1", bg: "bg-blue-100 dark:bg-blue-900/20" },
  resolved: { label: "Resolved", color: "text-status-green", bg: "bg-green-100 dark:bg-green-900/20" },
};

const severityColors: Record<string, { label: string; bg: string; border: string }> = {
  critical: { label: "Critical", bg: "bg-red-100 dark:bg-red-900/20", border: "border-red-300 dark:border-red-700" },
  high: { label: "High", bg: "bg-orange-100 dark:bg-orange-900/20", border: "border-orange-300 dark:border-orange-700" },
  medium: { label: "Medium", bg: "bg-yellow-100 dark:bg-yellow-900/20", border: "border-yellow-300 dark:border-yellow-700" },
  low: { label: "Low", bg: "bg-green-100 dark:bg-green-900/20", border: "border-green-300 dark:border-green-700" },
};

export function AlertDetail({ flagId, onClose }: AlertDetailProps) {
  const [flag, setFlag] = useState<AuditFlag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchFlag();
  }, [flagId]);

  const fetchFlag = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuditFlagById(flagId);
      setFlag(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setFlag(null);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchFlag();
  };

  const handleStatusUpdate = async (newStatus: "open" | "investigating" | "resolved") => {
    if (!flag) return;
    setUpdating(true);
    try {
      const updated = await updateAuditFlagStatus(flag.id, newStatus);
      setFlag(updated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update status";
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <h2 className="text-xl font-bold">Audit Flag Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && <LoadingState />}

          {error && !loading && (
            <ErrorState error={error} onRetry={handleRetry} isRetrying={retrying} />
          )}

          {!loading && !error && flag && (
            <div className="space-y-6">
              {/* Flag Header */}
              <div className={`p-4 rounded-lg border ${severityColors[flag.severity].bg} ${severityColors[flag.severity].border} border`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-status-red" />
                    <div>
                      <h3 className="font-bold text-lg">{flag.title}</h3>
                      <p className="text-sm text-muted-foreground font-mono mt-1">{flag.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      flag.severity === 'critical' ? 'bg-red-600 text-white' :
                      flag.severity === 'high' ? 'bg-orange-600 text-white' :
                      flag.severity === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {severityColors[flag.severity].label}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${statusColors[flag.status].bg} ${statusColors[flag.status].color}`}>
                      {statusColors[flag.status].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{flag.description}</p>
              </div>

              {/* Flag Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Project</span>
                  </div>
                  <p className="font-medium">{flag.projectName}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{flag.projectId}</p>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">County</span>
                  </div>
                  <p className="font-medium">{flag.county}</p>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Created</span>
                  </div>
                  <p className="font-medium">{new Date(flag.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(flag.createdAt).toLocaleTimeString()}</p>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Status</span>
                  </div>
                  <p className="font-medium capitalize">{flag.status}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {flag.status === 'open' ? 'Awaiting initial review' :
                     flag.status === 'investigating' ? 'Under active investigation' :
                     'Case closed and verified'}
                  </p>
                </div>
              </div>

              {/* Status Update Section */}
              {flag.status !== 'resolved' && (
                <div className="glass-panel p-4 border border-chart-1/30 bg-chart-1/5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Update Status
                  </h4>
                  <div className="space-y-2">
                    {flag.status !== 'investigating' && (
                      <button
                        onClick={() => handleStatusUpdate('investigating')}
                        disabled={updating}
                        className="w-full px-4 py-2 rounded-md bg-chart-1/10 border border-chart-1/30 hover:bg-chart-1/20 transition-colors text-sm font-medium text-chart-1 disabled:opacity-50"
                      >
                        {updating ? 'Updating...' : 'Mark as Investigating'}
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusUpdate('resolved')}
                      disabled={updating}
                      className="w-full px-4 py-2 rounded-md bg-status-green/10 border border-status-green/30 hover:bg-status-green/20 transition-colors text-sm font-medium text-status-green disabled:opacity-50"
                    >
                      {updating ? 'Updating...' : 'Mark as Resolved'}
                    </button>
                  </div>
                </div>
              )}

              {flag.status === 'resolved' && (
                <div className="glass-panel p-4 border border-status-green/30 bg-status-green/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-status-green" />
                    <div>
                      <p className="font-semibold text-status-green">Case Resolved</p>
                      <p className="text-sm text-muted-foreground">This audit flag has been verified and closed.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 bg-secondary/30 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
