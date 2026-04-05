import ChannelCard from "@/components/ChannelCard";
import { ChannelStatsProps } from "@/lib/interfaces";

export function ChannelStats({
  data,
  channels = ["Shopee", "Tiktok Shop", "Tokopedia"],
}: ChannelStatsProps) {
  const channelStats = channels.map(channel => {
    const filtered = data.filter(
      t => t.channel?.toLowerCase() === channel.toLowerCase(),
    );
    const totalRevenue = filtered.reduce(
      (sum, t) => sum + Number(t.gross_amount || 0),
      0,
    );
    const totalOrders = filtered.length;
    const avgValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    return {
      channel,
      revenue: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      orders: totalOrders.toLocaleString("id-ID"),
      avgValue: `Rp ${Math.round(avgValue).toLocaleString("id-ID")}`,
    };
  });
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {channelStats.map(stat => (
        <ChannelCard
          key={stat.channel}
          channel={stat.channel}
          revenue={stat.revenue}
          orders={stat.orders}
          avgValue={stat.avgValue}
        />
      ))}
    </div>
  );
}
