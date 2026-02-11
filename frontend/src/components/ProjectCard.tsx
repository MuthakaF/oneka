import { useMemo } from "react";
import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { RiskBadge } from "./RiskBadge";
import { CheckCircle2, AlertCircle, Clock, Zap, ChevronRight } from "lucide-react";
import { type Project } from "@/services/mockProjectsApi";

const projectCardStyles = cva("glass-panel transition-all", {
  variants: {
    variant: {
      compact: "p-4 hover:bg-accent/30",
      regular: "p-5 hover:bg-accent/30 cursor-pointer",
      detailed: "p-6 border border-border",
    },
    interactive: {
      true: "hover:shadow-lg",
      false: "",
    },
  },
  defaultVariants: {
    variant: "regular",
    interactive: true,
  },
});

interface ProjectCardProps extends VariantProps<typeof projectCardStyles> {
  project: Project;
  showDetails?: boolean;
  onClick?: () => void;
}

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  "on-track": {
    label: "On Track",
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: "text-status-green",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  "at-risk": {
    label: "At Risk",
    icon: <AlertCircle className="w-3 h-3" />,
    color: "text-status-amber",
    bg: "bg-amber-100 dark:bg-amber-900/20",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: "text-status-green",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  "on-hold": {
    label: "On Hold",
    icon: <Clock className="w-3 h-3" />,
    color: "text-status-amber",
    bg: "bg-amber-100 dark:bg-amber-900/20",
  },
  investigation: {
    label: "Investigation",
    icon: <AlertCircle className="w-3 h-3" />,
    color: "text-status-red",
    bg: "bg-red-100 dark:bg-red-900/20",
  },
};

export function ProjectCard({
  project,
  variant = "regular",
  interactive = true,
  showDetails = false,
  onClick,
}: ProjectCardProps) {
  // Calculate milestone progress
  const milestoneProgress = useMemo(() => {
    const total = project.milestones.length;
    const completed = project.milestones.filter((m) => m.completed).length;
    return { completed, total };
  }, [project.milestones]);

  const statusInfo = statusConfig[project.status] || statusConfig["on-track"];

  // Format last updated date
  const formattedDate = new Date(project.lastUpdated).toLocaleDateString(
    "en-KE",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const cardContent = (
    <>
      {/* Header with status and risk */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground mb-1">
            {project.id}
          </p>
          <h3
            className={`font-medium leading-tight ${
              variant === "compact" ? "text-sm" : "text-base"
            } truncate`}
          >
            {project.name}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-2">
          <RiskBadge riskLevel={project.riskLevel} />
        </div>
      </div>

      {/* Status badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}
        >
          {statusInfo.icon}
          {statusInfo.label}
        </span>
      </div>

      {/* Milestone progress */}
      {variant !== "compact" && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Milestones</span>
            <span className="font-mono font-semibold">
              {milestoneProgress.completed}/{milestoneProgress.total}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-chart-1 transition-all duration-300"
              style={{
                width:
                  milestoneProgress.total > 0
                    ? `${(milestoneProgress.completed / milestoneProgress.total) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* Additional details */}
      {(variant === "regular" || variant === "detailed") && (
        <div className="pt-3 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Entity:</span>
            <span className="font-medium truncate">{project.entity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>County:</span>
            <span className="font-medium">{project.county}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Last Updated:</span>
            <span className="font-mono">{formattedDate}</span>
          </div>
        </div>
      )}

      {/* Detailed view extra info */}
      {showDetails && variant === "detailed" && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Audit Status</span>
              <p className="font-medium mt-1">{project.auditStatus}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Sector</span>
              <p className="font-medium mt-1">{project.sector}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Contract Sum</span>
              <p className="font-mono font-semibold mt-1">
                {(project.contractSum / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Amount Paid</span>
              <p className="font-mono font-semibold mt-1">
                {(project.amountPaid / 1000000000).toFixed(2)}B
              </p>
            </div>
          </div>

          {/* Milestone details */}
          {project.milestones.length > 0 && (
            <div className="pt-2">
              <span className="text-muted-foreground text-xs">Milestones</span>
              <div className="mt-2 space-y-1">
                {project.milestones.slice(0, 3).map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-2 text-xs"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="w-3 h-3 text-status-green flex-shrink-0" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-muted-foreground">
                      {milestone.name}
                    </span>
                  </div>
                ))}
                {project.milestones.length > 3 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    +{project.milestones.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {interactive ? (
        <Link
          to={`/projects/${project.id}`}
          className={projectCardStyles({ variant, interactive })}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">{cardContent}</div>
            {variant === "regular" && (
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            )}
          </div>
        </Link>
      ) : (
        <div
          className={projectCardStyles({ variant, interactive: false })}
          onClick={onClick}
        >
          {cardContent}
        </div>
      )}
    </>
  );
}

/**
 * ProjectCardGrid - Renders multiple project cards in a responsive grid
 */
interface ProjectCardGridProps {
  projects: Project[];
  variant?: VariantProps<typeof projectCardStyles>["variant"];
  showDetails?: boolean;
}

export function ProjectCardGrid({
  projects,
  variant = "regular",
  showDetails = false,
}: ProjectCardGridProps) {
  const gridColsClass =
    variant === "compact"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : variant === "detailed"
        ? "grid-cols-1 lg:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant={variant}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
}
