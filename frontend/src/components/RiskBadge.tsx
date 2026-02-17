import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const riskBadgeVariants = cva(
  "inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
  {
    variants: {
      riskLevel: {
        low: "border-green-300 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200",
        medium: "border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200",
        high: "border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-200",
        critical: "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200",
      },
    },
    defaultVariants: {
      riskLevel: "low",
    },
  }
);

export interface RiskBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof riskBadgeVariants> {
  riskLevel?: "low" | "medium" | "high" | "critical";
  showIcon?: boolean;
}

const RiskBadge = React.forwardRef<HTMLDivElement, RiskBadgeProps>(
  ({ className, riskLevel = "low", showIcon = false, children, ...props }, ref) => {
    const getIcon = () => {
      if (!showIcon) return null;
      
      const iconClass = "w-4 h-4 mr-1.5";
      
      switch (riskLevel) {
        case "critical":
          return (
            <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          );
        case "high":
          return (
            <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v-.5a1 1 0 10-2 0V9zm0 4a1 1 0 112 0v-1a1 1 0 10-2 0v1z" clipRule="evenodd" />
            </svg>
          );
        case "medium":
          return (
            <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          );
        case "low":
        default:
          return (
            <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          );
      }
    };

    const displayLabel = children || riskLevel?.charAt(0).toUpperCase() + riskLevel?.slice(1);

    return (
      <div
        ref={ref}
        className={cn(riskBadgeVariants({ riskLevel }), className)}
        {...props}
      >
        {getIcon()}
        <span>{displayLabel}</span>
      </div>
    );
  }
);

RiskBadge.displayName = "RiskBadge";

export { RiskBadge, riskBadgeVariants };
