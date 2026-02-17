import { AppLayout } from "@/components/layout/AppLayout";
import { RiskBadge } from "@/components/RiskBadge";

export default function ComponentsShowcase() {
  return (
    <AppLayout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Component Showcase</h1>
          <p className="text-sm text-muted-foreground">
            Visual demo of reusable components
          </p>
        </div>

        {/* Risk Badge Showcase */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-4">Risk Badge Component</h2>
          <p className="text-sm text-muted-foreground mb-6">
            The RiskBadge component displays risk levels with color-coded styling and optional icons.
          </p>
          
          <div className="space-y-8">
            {/* Without Icons */}
            <div>
              <h3 className="text-sm font-medium mb-3">Without Icons</h3>
              <div className="flex flex-wrap gap-4">
                <RiskBadge riskLevel="low" />
                <RiskBadge riskLevel="medium" />
                <RiskBadge riskLevel="high" />
                <RiskBadge riskLevel="critical" />
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-sm font-medium mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <RiskBadge riskLevel="low" showIcon />
                <RiskBadge riskLevel="medium" showIcon />
                <RiskBadge riskLevel="high" showIcon />
                <RiskBadge riskLevel="critical" showIcon />
              </div>
            </div>

            {/* Custom Text */}
            <div>
              <h3 className="text-sm font-medium mb-3">With Custom Text</h3>
              <div className="flex flex-wrap gap-4">
                <RiskBadge riskLevel="low" showIcon>Low Risk - Verified</RiskBadge>
                <RiskBadge riskLevel="medium" showIcon>Medium Risk - Review</RiskBadge>
                <RiskBadge riskLevel="high" showIcon>High Risk - Flagged</RiskBadge>
                <RiskBadge riskLevel="critical" showIcon>Critical - Investigate</RiskBadge>
              </div>
            </div>

            {/* In Context - Table */}
            <div>
              <h3 className="text-sm font-medium mb-3">In Table Context</h3>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Project</th>
                      <th className="px-4 py-3 text-left font-medium">Risk Level</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border hover:bg-secondary/10">
                      <td className="px-4 py-3">Mombasa Water Supply Phase II</td>
                      <td className="px-4 py-3"><RiskBadge riskLevel="low" showIcon /></td>
                      <td className="px-4 py-3 text-muted-foreground">Verified</td>
                    </tr>
                    <tr className="border-t border-border hover:bg-secondary/10">
                      <td className="px-4 py-3">Kisumu Port Rehabilitation</td>
                      <td className="px-4 py-3"><RiskBadge riskLevel="medium" showIcon /></td>
                      <td className="px-4 py-3 text-muted-foreground">Under Review</td>
                    </tr>
                    <tr className="border-t border-border hover:bg-secondary/10">
                      <td className="px-4 py-3">Eldoret Bypass Construction</td>
                      <td className="px-4 py-3"><RiskBadge riskLevel="high" showIcon /></td>
                      <td className="px-4 py-3 text-muted-foreground">Flagged</td>
                    </tr>
                    <tr className="border-t border-border hover:bg-secondary/10">
                      <td className="px-4 py-3">Nairobi-Thika Highway Phase III</td>
                      <td className="px-4 py-3"><RiskBadge riskLevel="critical" showIcon /></td>
                      <td className="px-4 py-3 text-muted-foreground">Investigation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Info */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-4">Theme Toggle</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Use the theme toggle button in the sidebar (bottom section) to switch between light and dark modes. 
            The preference is automatically saved to your browser's local storage.
          </p>
          <div className="bg-secondary/50 p-4 rounded-lg text-sm text-foreground">
            <p className="font-mono">Current Mode: <span className="dark:hidden">Light</span><span className="hidden dark:inline">Dark</span></p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
