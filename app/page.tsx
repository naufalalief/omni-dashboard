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

const Page = () => {
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
      </div>
    </div>
  );
};

export default Page;
