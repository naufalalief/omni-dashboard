import { ReactNode } from "react";

export interface Transaction {
  order_id: string;
  channel: string;
  order_status: string;
  pay_time: string;
  gross_amount: string;
  net_amount: string;
  discount_amount: string;
  shipping_fee_amount: string;
  item_count: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
}

export interface ChannelCardProps {
  channel: string;
  revenue: string | number;
  orders: string | number;
  avgValue: string | number;
  icon?: ReactNode;
}
export interface ChannelStatsProps {
  data: Transaction[];
  channels?: string[];
}
