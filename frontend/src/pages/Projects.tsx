import { AppLayout } from "@/components/layout/AppLayout";
import { RiskBadge } from "@/components/RiskBadge";
import { ProjectFilter } from "@/components/ProjectFilter";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Download, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { getProjects, type Project } from "@/services/mockProjectsApi";

function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `KES ${(value / 1000000000).toFixed(2)}B`;
  }
  return `KES ${(value / 1000000).toFixed(0)}M`;
}

interface ProjectFilters {
  search: string;
  county: string;
  sector: string;
  riskLevel: string;
  auditStatus: string;
}

export default function Projects() {
  // API State Management
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    county: "All Counties",
    sector: "All Sectors",
    riskLevel: "All Risk Levels",
    auditStatus: "All Statuses",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setProjects([]);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchProjects();
  };

  // Filter projects based on search and filter criteria
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(searchLower) ||
          project.id.toLowerCase().includes(searchLower) ||
          project.entity.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // County filter
      if (filters.county !== "All Counties") {
        if (!project.county.includes(filters.county)) return false;
      }

      // Sector filter
      if (filters.sector !== "All Sectors") {
        if (project.sector !== filters.sector) return false;
      }

      // Risk Level filter
      if (filters.riskLevel !== "All Risk Levels") {
        if (project.riskLevel !== filters.riskLevel) return false;
      }

      // Audit Status filter
      if (filters.auditStatus !== "All Statuses") {
        if (project.auditStatus !== filters.auditStatus) return false;
      }

      return true;
    });
  }, [projects, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Reset to first page when page size changes
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.county !== "All Counties") count++;
    if (filters.sector !== "All Sectors") count++;
    if (filters.riskLevel !== "All Risk Levels") count++;
    if (filters.auditStatus !== "All Statuses") count++;
    return count;
  }, [filters]);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Projects Registry</h1>
            <p className="text-sm text-muted-foreground mt-1">
              National Development Projects Under Audit Surveillance
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
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
            {/* Search and Filter Component */}
            <ProjectFilter onFiltersChange={setFilters} activeFilterCount={activeFilterCount} />

            {/* Empty State - No Projects */}
            {filteredProjects.length === 0 && projects.length === 0 && <EmptyState />}

            {/* Empty State - Filters Applied but No Results */}
            {filteredProjects.length === 0 && projects.length > 0 && <EmptyState />}

            {/* Projects Table */}
            {filteredProjects.length > 0 && (
              <div className="glass-panel overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th>Project ID</th>
                      <th>Project Name</th>
                      <th>County</th>
                      <th>Sector</th>
                      <th className="text-right">Contract Sum</th>
                      <th className="text-right">Amount Paid</th>
                      <th>Risk Level</th>
                      <th>Audit Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProjects.map((project) => (
                      <tr key={project.id} className="group">
                        <td className="font-mono text-sm text-muted-foreground">{project.id}</td>
                        <td>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.entity}</p>
                          </div>
                        </td>
                        <td className="text-muted-foreground">{project.county}</td>
                        <td className="text-muted-foreground">{project.sector}</td>
                        <td className="text-right font-mono">{formatCurrency(project.contractSum)}</td>
                        <td className="text-right font-mono">{formatCurrency(project.amountPaid)}</td>
                        <td>
                          <RiskBadge riskLevel={project.riskLevel} showIcon />
                        </td>
                        <td className="text-sm">{project.auditStatus}</td>
                        <td>
                          <Link
                            to={`/projects/${project.id}`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-md hover:bg-accent"
                          >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer - Pagination Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20 flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="page-size" className="text-sm text-muted-foreground">
                      Projects per page:
                    </label>
                    <select
                      id="page-size"
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                      className="console-input text-sm px-2 py-1.5"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(endIndex, filteredProjects.length)}</span> of{" "}
                    <span className="font-medium">{filteredProjects.length}</span> projects
                    {activeFilterCount > 0 && (
                      <span className="ml-2 text-status-amber">
                        ({activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active)
                      </span>
                    )}
                  </p>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Page <span className="font-medium">{currentPage}</span> of{" "}
                      <span className="font-medium">{Math.max(1, totalPages)}</span>
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-1.5 rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Legal Reference */}
            <div className="text-xs text-muted-foreground">
              <span className="legal-ref">
                Data sourced from IFMIS, PIMIS, COB • Updated: 2024-01-26 14:00 EAT
              </span>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
