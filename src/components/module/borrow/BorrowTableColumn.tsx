import type { IBorrowSummary } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";

export const borrowSummaryColumns: ColumnDef<IBorrowSummary>[] = [
  {
    header: "Book Title",
    accessorFn: (row) => row.book.title,
  },
  {
    header: "ISBN",
    accessorFn: (row) => row.book.isbn,
  },
  {
    header: "Total Borrowed",
    accessorKey: "totalQuantity",
  },
];
