import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Transaction, unknown>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    enableSorting: true,
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <b>{String(getValue() ?? "-")}</b>
    ),
  },
  {
    accessorKey: "channel",
    header: "Channel",
    enableSorting: true,
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
    enableSorting: true,
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
    enableSorting: true,
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span className="font-semibold">
        Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}
      </span>
    ),
  },
  {
    accessorKey: "net_amount",
    header: "Net Amount",
    enableSorting: true,
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span>Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "discount_amount",
    header: "Discount",
    enableSorting: true,
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
    enableSorting: true,
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span>Rp {Number(getValue() ?? 0).toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "item_count",
    header: "Items",
    enableSorting: true,
  },
  {
    accessorKey: "order_status",
    header: "Status",
    enableSorting: true,
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
