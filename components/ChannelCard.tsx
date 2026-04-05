import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface ChannelCardProps {
  channel: string;
  revenue: string | number;
  orders: string | number;
  avgValue: string | number;
  icon?: ReactNode;
}

const ChannelCard = ({
  channel,
  revenue,
  orders,
  avgValue,
  icon,
}: ChannelCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>{channel}</CardTitle>
        {icon && <span>{icon}</span>}
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-2xl font-bold">{revenue}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Orders:</span>
            <span className="text-foreground font-medium">{orders}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Avg Value:</span>
            <span className="text-foreground font-medium">{avgValue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
