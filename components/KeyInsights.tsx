import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Transaction } from "@/lib/interfaces";

type KeyInsightsProps = {
  data: Transaction[];
};

function getCompletedOrders(data: Transaction[]) {
  return data.filter(t => t.order_status?.toLowerCase() === "completed").length;
}

function getTotal(data: Transaction[], key: keyof Transaction) {
  return data.reduce((sum, t) => sum + Number(t[key] || 0), 0);
}

function getProfitMargin(totalNet: number, totalRevenue: number) {
  return totalRevenue > 0 ? (totalNet / totalRevenue) * 100 : 0;
}

function getHighShippingOrders(data: Transaction[], threshold: number) {
  return data.filter(t => Number(t.shipping_fee_amount || 0) > threshold)
    .length;
}

export function KeyInsights({ data }: KeyInsightsProps) {
  const completedOrders = getCompletedOrders(data);
  const totalRevenue = getTotal(data, "gross_amount");
  const totalNet = getTotal(data, "net_amount");
  const profitMargin = getProfitMargin(totalNet, totalRevenue);
  const HIGH_SHIPPING = 20000;
  const highShippingOrders = getHighShippingOrders(data, HIGH_SHIPPING);

  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Key Insights</AlertTitle>
      <AlertDescription>
        <div>
          You have <b>{completedOrders.toLocaleString("id-ID")}</b> completed
          orders with a profit margin of <b>{profitMargin.toFixed(1)}%</b>.
        </div>
        {highShippingOrders > 0 && (
          <div style={{ color: "#EA580C", marginTop: 4 }}>
            <b>{highShippingOrders.toLocaleString("id-ID")}</b> orders have
            unusually high shipping costs.
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
