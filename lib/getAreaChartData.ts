import { Transaction } from "@/lib/interfaces";

export function getAreaChartData(data: Transaction[]) {
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
  return {
    data: Array.from(map.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, obj]) => {
        const row: Record<string, number | string> = { date };
        channels.forEach(ch => {
          row[ch] = obj[ch] || 0;
        });
        return row;
      }),
    channels,
  };
}
