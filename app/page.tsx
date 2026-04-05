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
import ChannelCard from "@/components/ui/ChannelCard";
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
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Key Insights</AlertTitle>
          <AlertDescription>
            You have x completed orders with a profit margin of n%.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricCard
            title="Total Revenue (Gross)"
            value="Rp 383.469.919"
            subtitle="Net: Rp 282.232.463"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Total Orders"
            value="5,000"
            subtitle="7117 items sold"
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Average Order Value"
            value="Rp 76.694"
            subtitle="Per transaction"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Profit Margin"
            value="73.6%"
            subtitle="Discount: Rp 0"
            icon={<Box className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <ChartAreaInteractive />
          <ChartPieInteractive />
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <ChannelCard
            channel="Shopee"
            revenue="Rp 213.104.969"
            orders="3944"
            avgValue="Rp 54.033"
          />
          <ChannelCard
            channel="Tiktok Shop"
            revenue="Rp 62.271.226"
            orders="947"
            avgValue="Rp 65.756"
          />
          <ChannelCard
            channel="Tokopedia"
            revenue="Rp 6.856.268"
            orders="109"
            avgValue="Rp 62.902"
          />
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
