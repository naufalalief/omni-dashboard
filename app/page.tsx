"use client";
import MetricCard from "@/components/MetricCard";
import { Box, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { ChartAreaInteractive } from "@/components/Chart";
import { ChartPieInteractive } from "@/components/PieChart";
import ChannelCard from "@/components/ChannelCard";
import { DataTable } from "@/components/ui/data-table";
import { Transaction } from "@/lib/interfaces";
import { columns } from "@/components/table/columns";
import { KeyInsights } from "@/components/KeyInsights";
import { useTransactions } from "@/lib/useTransactions";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { getAreaChartData } from "@/lib/getAreaChartData";
import { getPieChartData } from "@/lib/getPieChartData";
import { ChannelStats } from "@/components/ChannelStats";

const Page = () => {
  const data = useTransactions();

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
        <KeyInsights data={data} />
        <DashboardMetrics data={data} />
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <ChartAreaInteractive {...getAreaChartData(data)} />
          <ChartPieInteractive data={getPieChartData(data)} />
        </div>
        <ChannelStats data={data} />
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
      {/* Footer */}
      <footer className="w-full border-t mt-12 py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()}
          <a
            href="https://github.com/naufalalief"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors ml-1"
          >
            Naufal Alief
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;
