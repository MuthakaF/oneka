import { AppLayout } from "@/components/layout/AppLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RecentAuditFlags } from "@/components/dashboard/RecentAuditFlags";
import { AuditProgressChart } from "@/components/dashboard/AuditProgressChart";
import { SectorBreakdown } from "@/components/dashboard/SectorBreakdown";
import { RiskSummary } from "@/components/dashboard/RiskSummary";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { FolderOpen, AlertTriangle, Wallet, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardMetrics, type DashboardMetrics } from "@/services/mockDashboardApi";

function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `KES ${(value / 1000000000).toFixed(2)}B`;
  }
  return `KES ${(value / 1000000).toFixed(0)}M`;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchMetrics();
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6">
          <LoadingState />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <ErrorState error={error} onRetry={handleRetry} isRetrying={retrying} />
        </div>
      </AppLayout>
    );
  }

  if (!metrics) {
    return (
      <AppLayout>
        <div className="p-6 text-center text-muted-foreground">
          No data available
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">National Audit Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Public Financial Management Intelligence Dashboard
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Reporting Period</p>
            <p className="text-sm font-mono font-medium">FY 2023/24 • Q3</p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Projects Monitored"
            value={metrics.kpis.projectsMonitored.toString()}
            subValue="+24 this quarter"
            trend="up"
            icon={<FolderOpen className="w-4 h-4 text-muted-foreground" />}
          />
          <KPICard
            label="High-Risk Projects"
            value={metrics.kpis.highRiskProjects.toString()}
            subValue="12% of portfolio"
            trend="neutral"
            icon={<AlertTriangle className="w-4 h-4 text-status-red" />}
          />
          <KPICard
            label="Funds Disbursed"
            value={formatCurrency(metrics.kpis.fundsDisbursed)}
            subValue="Against KES 78.4B budgeted"
            icon={<Wallet className="w-4 h-4 text-muted-foreground" />}
          />
          <KPICard
            label="Verified Progress"
            value={formatCurrency(metrics.kpis.verifiedProgress)}
            subValue="83.7% verification rate"
            trend="up"
            icon={<TrendingUp className="w-4 h-4 text-status-green" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <AuditProgressChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SectorBreakdown />
              <RiskSummary />
            </div>
          </div>

          {/* Right Column - Alerts */}
          <div className="space-y-6">
            <RecentAuditFlags />
            
            {/* Legal Framework Reference */}
            <div className="glass-panel p-5">
              <h3 className="section-header">Legal Framework</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">PFM Act 2012</p>
                  <p className="text-xs text-muted-foreground">Section 68 — Responsibility of Accounting Officers</p>
                </div>
                <div>
                  <p className="font-medium">PPADA 2015</p>
                  <p className="text-xs text-muted-foreground">Part IX — Procurement Review and Audit</p>
                </div>
                <div>
                  <p className="font-medium">Constitution of Kenya</p>
                  <p className="text-xs text-muted-foreground">Article 229 — Functions of the Auditor-General</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
