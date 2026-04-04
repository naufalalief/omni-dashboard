import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MetricCard from "@/components/ui/MetricCard";

import { AlertCircle, DollarSign } from "lucide-react";

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
        </div>
      </div>
    </div>
  );
};

export default Page;
