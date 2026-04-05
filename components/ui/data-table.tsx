"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export interface FilterColumn {
  accessorKey: string;
  label: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  filterColumns?: FilterColumn[];
}

export function DataTable<TData extends Record<string, any>, TValue = unknown>({
  columns,
  data,
  searchPlaceholder = "Search...",
  filterColumns = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-3xl border shadow-sm bg-card p-0">
      <div className="flex flex-wrap gap-2 items-center justify-between px-6 pt-6 pb-2">
        <div>
          <h2 className="text-lg font-semibold mb-1">Recent Transactions</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Showing {table.getRowModel().rows.length} of{" "}
            {table.getPrePaginationRowModel().rows.length} transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 opacity-60"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={
                (table.getColumn("order_id")?.getFilterValue() as string) ?? ""
              }
              onChange={event =>
                table.getColumn("order_id")?.setFilterValue(event.target.value)
              }
              className="text-base"
            />
          </InputGroup>
          {filterColumns.map(filter => {
            const col = table.getColumn(filter.accessorKey);
            if (!col) return null;
            const options = Array.from(
              new Set((data as TData[]).map(row => row[filter.accessorKey])),
            ).filter(Boolean);
            const selected = (col.getFilterValue() as string) ?? "";
            // Determine if this is the special 'All' option
            const isAllLabel = filter.label?.toLowerCase().includes("all");
            return (
              <DropdownMenu key={filter.accessorKey}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-xl min-w-35 justify-between px-4 py-2 text-base font-normal border-input bg-background text-foreground shadow-none focus-visible:ring-2"
                    aria-label={filter.label}
                  >
                    {selected ? String(selected) : filter.label}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="border border-border drop-shadow-xl rounded-xl py-2 px-0 min-w-45"
                >
                  <DropdownMenuRadioGroup
                    value={selected}
                    onValueChange={val => {
                      if (val === "") {
                        col.setFilterValue(undefined);
                      } else {
                        col.setFilterValue(val);
                      }
                    }}
                  >
                    <DropdownMenuRadioItem
                      value=""
                      className="flex items-center px-4 py-2 text-base font-normal focus:bg-muted-foreground/10 data-[state=checked]:font-semibold data-[state=checked]:text-primary"
                    >
                      {filter.label}
                    </DropdownMenuRadioItem>
                    {options.map(opt => (
                      <DropdownMenuRadioItem
                        key={String(opt)}
                        value={String(opt)}
                        className="flex items-center px-4 py-2 text-base font-normal focus:bg-muted-foreground/10 data-[state=checked]:font-semibold data-[state=checked]:text-primary"
                      >
                        {String(opt)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto p-6 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="bg-background sticky top-0 z-10"
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-muted-foreground bg-background select-none cursor-pointer"
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <ChevronDown
                            className={
                              header.column.getIsSorted() === "asc"
                                ? "ml-1 h-4 w-4 transition-transform rotate-180"
                                : header.column.getIsSorted() === "desc"
                                  ? "ml-1 h-4 w-4 transition-transform"
                                  : "ml-1 h-4 w-4 opacity-30"
                            }
                          />
                        )}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/40"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 px-6 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded-3xl"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="mx-2 min-w-15 text-center text-base font-medium select-none">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded-3xl"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
