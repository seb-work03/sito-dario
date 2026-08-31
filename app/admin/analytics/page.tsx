import { AnalyticsDashboard } from "@/components/admin/analytics/AnalyticsDashboard";
import { requireAdminPage } from "@/lib/admin";

export default async function AnalyticsPage() {
  await requireAdminPage();
  return <AnalyticsDashboard />;
}
