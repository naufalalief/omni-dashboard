import MetricCard from "@/components/MetricCard";
import { Box, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { Transaction } from "@/lib/interfaces";

type DashboardMetricsProps = {
  data: Transaction[];
};

function getTotal(data: Transaction[], key: keyof Transaction) {
  return data.reduce((sum, t) => sum + Number(t[key] || 0), 0);
}

function getMostPopularChannel(data: Transaction[]) {
  const channelCount: Record<string, number> = {};
  for (const t of data) {
    const ch = t.channel?.trim() || "Unknown";
    channelCount[ch] = (channelCount[ch] || 0) + 1;
  }
  const sorted = Object.entries(channelCount).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "-";
}

export function DashboardMetrics({ data }: DashboardMetricsProps) {
  const totalRevenue = getTotal(data, "gross_amount");
  const totalNet = getTotal(data, "net_amount");
  const totalOrders = data.length;
  const totalItems = getTotal(data, "item_count");
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const mostPopularChannel = getMostPopularChannel(data);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <MetricCard
        title="Total Revenue (Gross)"
        value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
        subtitle={`Net: Rp ${totalNet.toLocaleString("id-ID")}`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Total Orders"
        value={totalOrders.toLocaleString("id-ID")}
        subtitle={`${totalItems.toLocaleString("id-ID")} items sold`}
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Average Order Value"
        value={`Rp ${Math.round(avgOrderValue).toLocaleString("id-ID")}`}
        subtitle="Per transaction"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Most Popular Channel"
        value={mostPopularChannel}
        subtitle="By order count"
        icon={<Box className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
