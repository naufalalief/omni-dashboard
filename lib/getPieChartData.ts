import { Transaction } from "@/lib/interfaces";

export function getPieChartData(data: Transaction[]) {
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
}
