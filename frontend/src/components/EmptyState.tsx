import { FolderOpen } from "lucide-react";

/**
 * EmptyState Component
 * 
 * Displays a friendly message when no projects are found
 * Could be due to empty database or active filters
 */
export function EmptyState() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-6">
        {/* Empty Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <FolderOpen className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        {/* Empty Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">No Projects Found</h3>
          <p className="text-sm text-muted-foreground">
            No projects match your current filters. Try adjusting your search criteria.
          </p>
        </div>

        {/* Suggestions */}
        <div className="text-xs text-muted-foreground space-y-1 bg-secondary/30 p-4 rounded-md">
          <p className="font-medium text-foreground">Suggestions:</p>
          <ul className="space-y-1">
            <li>• Clear some filters and try again</li>
            <li>• Check the spelling of your search term</li>
            <li>• Browse all projects without filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
