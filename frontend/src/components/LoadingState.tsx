import { Loader2 } from "lucide-react";

/**
 * LoadingState Component
 * 
 * Displays a loading spinner with skeleton placeholders
 * Maintains layout dimensions to prevent layout shift
 */
export function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-secondary rounded animate-pulse" />
        <div className="h-4 w-96 bg-secondary rounded animate-pulse" />
      </div>

      {/* Filter Skeleton */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-secondary rounded animate-pulse" />
          <div className="w-32 h-10 bg-secondary rounded animate-pulse" />
          <div className="w-28 h-10 bg-secondary rounded animate-pulse" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="glass-panel overflow-hidden">
        <div className="border-b border-border bg-secondary/30 p-4">
          <div className="grid grid-cols-9 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-4 bg-secondary rounded animate-pulse" />
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <div key={rowIdx} className="p-4">
              <div className="grid grid-cols-9 gap-4">
                {Array.from({ length: 9 }).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className="h-4 bg-secondary rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
          <div className="h-4 w-48 bg-secondary rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-secondary rounded animate-pulse" />
            <div className="h-8 w-24 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="flex items-center justify-center gap-3 py-8">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading projects…</p>
      </div>
    </div>
  );
}
