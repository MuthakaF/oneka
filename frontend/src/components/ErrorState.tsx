import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

/**
 * ErrorState Component
 * 
 * Displays an error message with a retry button
 * Used when data fetching fails
 */
export function ErrorState({ error, onRetry, isRetrying = false }: ErrorStateProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-status-red/10 dark:bg-status-red/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-status-red" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Failed to Load Projects</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Retrying…" : "Try Again"}
        </button>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground">
          If the problem persists, please contact support or try again in a few moments.
        </p>
      </div>
    </div>
  );
}
