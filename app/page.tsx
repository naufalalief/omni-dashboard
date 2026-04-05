"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MetricCard from "@/components/MetricCard";
import {
  AlertCircle,
  Box,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { ChartAreaInteractive } from "@/components/Chart";
import { ChartPieInteractive } from "@/components/PieChart";
import ChannelCard from "@/components/ChannelCard";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { parseCsv } from "@/lib/csv";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  order_id: string;
  channel: string;
  order_status: string;
  pay_time: string;
  gross_amount: string;
  net_amount: string;
  discount_amount: string;
  shipping_fee_amount: string;
  item_count: string;
};

const columns: ColumnDef<Transaction, unknown>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <b>{String(getValue() ?? "-")}</b>
    ),
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <Badge
        variant="outline"
        className="bg-muted text-foreground border px-2 py-0.5 text-xs font-medium rounded-full"
      >
        {String(getValue() ?? "-")}
      </Badge>
    ),
  },
  {
    accessorKey: "pay_time",
    header: "Date",
    cell: ({ getValue }: { getValue: () => unknown }) => {
      const val = getValue();
      if (!val) return "-";
      try {
        return format(new Date(String(val)), "d MMM yyyy");
      } catch {
        return String(val);
      }
    },
  },
  {
    accessorKey: "gross_amount",
    header: "Gross Amount",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span className="font-semibold">
        Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}
      </span>
    ),
  },
  {
    accessorKey: "net_amount",
    header: "Net Amount",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span>Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "discount_amount",
    header: "Discount",
    cell: ({ getValue }: { getValue: () => unknown }) =>
      Number(getValue() ?? 0) === 0 ? (
        <span>-</span>
      ) : (
        <span>Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}</span>
      ),
  },
  {
    accessorKey: "shipping_fee_amount",
    header: "Shipping",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span>Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "item_count",
    header: "Items",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <Badge
        variant="default"
        className="bg-primary text-primary-foreground font-bold px-2 py-0.5 text-xs rounded"
      >
        {String(getValue() ?? "-")}
      </Badge>
    ),
  },
];

const Page = () => {
  const [data, setData] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/import/frontend-engineer-task.csv")
      .then(res => res.text())
      .then(text => {
        setData(parseCsv(text) as Transaction[]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Omnichannel Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your business performance across all sales channels
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {(() => {
          const completedOrders = data.filter(
            t => t.order_status?.toLowerCase() === "completed",
          ).length;
          const totalOrders = data.length;
          const totalRevenue = data.reduce(
            (sum, t) => sum + Number(t.gross_amount || 0),
            0,
          );
          const totalNet = data.reduce(
            (sum, t) => sum + Number(t.net_amount || 0),
            0,
          );
          const profitMargin =
            totalRevenue > 0 ? (totalNet / totalRevenue) * 100 : 0;
          const HIGH_SHIPPING = 20000;
          const highShippingOrders = data.filter(
            t => Number(t.shipping_fee_amount || 0) > HIGH_SHIPPING,
          ).length;
          return (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Key Insights</AlertTitle>
              <AlertDescription>
                <div>
                  You have <b>{completedOrders.toLocaleString("id-ID")}</b>{" "}
                  completed orders with a profit margin of{" "}
                  <b>{profitMargin.toFixed(1)}%</b>.
                </div>
                {highShippingOrders > 0 && (
                  <div style={{ color: "#EA580C", marginTop: 4 }}>
                    <b>{highShippingOrders.toLocaleString("id-ID")}</b> orders
                    have unusually high shipping costs.
                  </div>
                )}
              </AlertDescription>
            </Alert>
          );
        })()}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {(() => {
            // Calculate metrics from data
            const totalRevenue = data.reduce(
              (sum, t) => sum + Number(t.gross_amount || 0),
              0,
            );
            const totalNet = data.reduce(
              (sum, t) => sum + Number(t.net_amount || 0),
              0,
            );
            const totalOrders = data.length;
            const totalItems = data.reduce(
              (sum, t) => sum + Number(t.item_count || 0),
              0,
            );
            const avgOrderValue =
              totalOrders > 0 ? totalRevenue / totalOrders : 0;
            const totalDiscount = data.reduce(
              (sum, t) => sum + Number(t.discount_amount || 0),
              0,
            );
            const profitMargin =
              totalRevenue > 0 ? (totalNet / totalRevenue) * 100 : 0;
            // Most popular channel
            const channelCount: Record<string, number> = {};
            data.forEach(t => {
              const ch = t.channel?.trim() || "Unknown";
              channelCount[ch] = (channelCount[ch] || 0) + 1;
            });
            const mostPopularChannel =
              Object.entries(channelCount).sort(
                (a, b) => b[1] - a[1],
              )[0]?.[0] || "-";
            return [
              <MetricCard
                key="revenue"
                title="Total Revenue (Gross)"
                value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
                subtitle={`Net: Rp ${totalNet.toLocaleString("id-ID")}`}
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />,
              <MetricCard
                key="orders"
                title="Total Orders"
                value={totalOrders.toLocaleString("id-ID")}
                subtitle={`${totalItems.toLocaleString("id-ID")} items sold`}
                icon={
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                }
              />,
              <MetricCard
                key="avg"
                title="Average Order Value"
                value={`Rp ${Math.round(avgOrderValue).toLocaleString("id-ID")}`}
                subtitle="Per transaction"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />,
              <MetricCard
                key="insight"
                title="Most Popular Channel"
                value={mostPopularChannel}
                subtitle="By order count"
                icon={<Box className="h-4 w-4 text-muted-foreground" />}
              />,
            ];
          })()}
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <ChartAreaInteractive
            data={(() => {
              const channelSet = new Set<string>();
              data.forEach(t => {
                if (t.channel) channelSet.add(t.channel.trim());
              });
              const channels = Array.from(channelSet);
              const map = new Map<string, { [channel: string]: number }>();
              data.forEach(t => {
                if (!t.pay_time || !t.gross_amount || !t.channel) return;
                const date = t.pay_time.split(" ")[0];
                if (isNaN(new Date(date).getTime())) return;
                const channel = t.channel.trim();
                const val = Number(t.gross_amount || 0);
                if (!map.has(date)) map.set(date, {});
                map.get(date)![channel] = (map.get(date)![channel] || 0) + val;
              });
              // Compose array for recharts
              return Array.from(map.entries())
                .sort(
                  (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
                )
                .map(([date, obj]) => {
                  const row: any = { date };
                  channels.forEach(ch => {
                    row[ch] = obj[ch] || 0;
                  });
                  return row;
                });
            })()}
            channels={(() => {
              const channelSet = new Set<string>();
              data.forEach(t => {
                if (t.channel) channelSet.add(t.channel.trim());
              });
              return Array.from(channelSet);
            })()}
          />
          <ChartPieInteractive
            data={(() => {
              // Pie chart for order status share
              const map = new Map<string, number>();
              data.forEach(t => {
                if (!t.order_status) return;
                const status = t.order_status.trim();
                map.set(status, (map.get(status) || 0) + 1);
              });
              return Array.from(map.entries()).map(([channel, value]) => ({
                channel,
                value,
              }));
            })()}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {(() => {
            const channels = ["Shopee", "Tiktok Shop", "Tokopedia"];
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
            return channelStats.map(stat => (
              <ChannelCard
                key={stat.channel}
                channel={stat.channel}
                revenue={stat.revenue}
                orders={stat.orders}
                avgValue={stat.avgValue}
              />
            ));
          })()}
        </div>
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder="Search by Order ID..."
          filterColumns={[
            { accessorKey: "channel", label: "All Channels" },
            { accessorKey: "order_status", label: "All Status" },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
