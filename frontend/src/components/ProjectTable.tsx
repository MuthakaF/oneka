import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import { type Project } from "@/services/mockProjectsApi";

type SortColumn = "name" | "status" | "riskLevel" | "lastUpdated";
type SortDirection = "asc" | "desc";

interface ProjectTableProps {
  projects: Project[];
  rowsPerPage?: number;
  showActions?: boolean;
  onProjectSelect?: (project: Project) => void;
}

interface SortState {
  column: SortColumn | null;
  direction: SortDirection;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function sortProjects(
  projects: Project[],
  sortState: SortState
): Project[] {
  if (!sortState.column) return projects;

  const sorted = [...projects].sort((a, b) => {
    let aVal: string | number | Date;
    let bVal: string | number | Date;

    switch (sortState.column) {
      case "name":
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case "status":
        aVal = a.status.toLowerCase();
        bVal = b.status.toLowerCase();
        break;
      case "riskLevel":
        // Risk level order: low -> medium -> high -> critical
        const riskOrder = { low: 0, medium: 1, high: 2, critical: 3 };
        aVal = riskOrder[a.riskLevel] || 0;
        bVal = riskOrder[b.riskLevel] || 0;
        break;
      case "lastUpdated":
        aVal = new Date(a.lastUpdated);
        bVal = new Date(b.lastUpdated);
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortState.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortState.direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  "on-track": { label: "On Track", color: "text-status-green" },
  "at-risk": { label: "At Risk", color: "text-status-amber" },
  completed: { label: "Completed", color: "text-status-green" },
  "on-hold": { label: "On Hold", color: "text-status-amber" },
  investigation: { label: "Investigation", color: "text-status-red" },
};

const ColumnHeader = ({
  label,
  sortColumn,
  currentSort,
  onSort,
}: {
  label: string;
  sortColumn: SortColumn;
  currentSort: SortState;
  onSort: (column: SortColumn) => void;
}) => {
  const isSorted = currentSort.column === sortColumn;

  return (
    <button
      onClick={() => onSort(sortColumn)}
      className="flex items-center gap-1.5 hover:text-foreground transition-colors text-left font-semibold uppercase text-xs tracking-wider py-2"
    >
      {label}
      {isSorted ? (
        currentSort.direction === "asc" ? (
          <ChevronUp className="w-4 h-4 text-chart-1" />
        ) : (
          <ChevronDown className="w-4 h-4 text-chart-1" />
        )
      ) : (
        <span className="w-4 h-4" />
      )}
    </button>
  );
};

export function ProjectTable({
  projects,
  rowsPerPage = 10,
  showActions = true,
  onProjectSelect,
}: ProjectTableProps) {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Sort projects
  const sortedProjects = useMemo(
    () => sortProjects(projects, sortState),
    [projects, sortState]
  );

  // Calculate pagination
  const totalPages = Math.ceil(sortedProjects.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProjects = sortedProjects.slice(startIndex, endIndex);

  const handleSort = (column: SortColumn) => {
    if (sortState.column === column) {
      // Toggle direction if same column
      setSortState({
        column,
        direction: sortState.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // New column, default to ascending
      setSortState({
        column,
        direction: "asc",
      });
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Responsive table state
  const [collapsedColumns, setCollapsedColumns] = useState<Set<string>>(
    new Set(["entity"])
  );

  if (projects.length === 0) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-muted-foreground">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr className="bg-secondary/30 border-b border-border">
                <th>
                  <ColumnHeader
                    label="Project Name"
                    sortColumn="name"
                    currentSort={sortState}
                    onSort={handleSort}
                  />
                </th>
                <th>
                  <ColumnHeader
                    label="Status"
                    sortColumn="status"
                    currentSort={sortState}
                    onSort={handleSort}
                  />
                </th>
                <th>
                  <ColumnHeader
                    label="Risk"
                    sortColumn="riskLevel"
                    currentSort={sortState}
                    onSort={handleSort}
                  />
                </th>
                <th>
                  <ColumnHeader
                    label="Last Updated"
                    sortColumn="lastUpdated"
                    currentSort={sortState}
                    onSort={handleSort}
                  />
                </th>
                {showActions && <th className="w-12"></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => {
                const statusInfo =
                  statusConfig[project.status] ||
                  statusConfig["on-track"];

                return (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                    <td>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          {project.id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>
                      <RiskBadge
                        riskLevel={project.riskLevel}
                        showIcon
                      />
                    </td>
                    <td className="text-sm text-muted-foreground font-mono">
                      {formatDate(project.lastUpdated)}
                    </td>
                    {showActions && (
                      <td>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors"
                          title="View project details"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(endIndex, sortedProjects.length)}
            </span>{" "}
            of <span className="font-medium">{sortedProjects.length}</span>{" "}
            projects
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-accent transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="px-3 py-1.5 text-sm text-muted-foreground">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-accent transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {paginatedProjects.map((project) => {
          const statusInfo =
            statusConfig[project.status] || statusConfig["on-track"];

          return (
            <div key={project.id} className="glass-panel p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight line-clamp-2">
                      {project.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {project.id}
                    </p>
                  </div>
                  <RiskBadge
                    riskLevel={project.riskLevel}
                    showIcon
                  />
                </div>

                {/* Status and Date */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatDate(project.lastUpdated)}
                  </span>
                </div>

                {/* Additional info */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/50">
                  <div>
                    <p className="text-muted-foreground">County</p>
                    <p className="font-medium">{project.county}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sector</p>
                    <p className="font-medium text-right">{project.sector}</p>
                  </div>
                </div>

                {/* Action */}
                {showActions && (
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full mt-2 px-3 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {/* Mobile Pagination */}
        <div className="flex flex-col gap-3">
          <div className="text-sm text-muted-foreground text-center">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span> • Showing{" "}
            <span className="font-medium">{paginatedProjects.length}</span> of{" "}
            <span className="font-medium">{sortedProjects.length}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex-1 px-3 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex-1 px-3 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Sortable generic table column configuration
 * Can be extended for use with other data types
 */
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

/**
 * Generic Table component template for future use
 * This allows ProjectTable patterns to be reused for other data types
 */
export function useTableSort<T extends Record<string, any>>(
  items: T[],
  initialSort?: { column: keyof T; direction: "asc" | "desc" }
) {
  const [sortState, setSortState] = useState<{
    column: keyof T | null;
    direction: "asc" | "desc";
  }>({
    column: initialSort?.column ?? null,
    direction: initialSort?.direction ?? "asc",
  });

  const sortedItems = useMemo(() => {
    if (!sortState.column) return items;

    return [...items].sort((a, b) => {
      const aVal = a[sortState.column as keyof T];
      const bVal = b[sortState.column as keyof T];

      if (aVal < bVal)
        return sortState.direction === "asc" ? -1 : 1;
      if (aVal > bVal)
        return sortState.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortState]);

  return { sortedItems, sortState, setSortState };
}

/**
 * Reusable pagination hook for any data type
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number = 10
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
    handleNextPage,
    handlePreviousPage,
    goToPage,
  };
}
