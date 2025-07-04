import type { IBook } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import React from "react";
import DeleteBookAlert from "./DeleteBookAlert";
import { useDeleteBookMutation } from "@/redux/features/book/bookApi";
import { toast } from "sonner";

export const columns: ColumnDef<IBook>[] = [
  {
    accessorKey: "title",
    header: "Title",

    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="max-w-3xs md:max-w-xs truncate">
          <Link className="hover:underline" to={`/books/${book._id}`}>
            {book.title}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },

  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },

  {
    accessorKey: "copies",
    header: "Copies",
  },
  {
    accessorKey: "available",
    header: "Availability",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;
      const [open, setOpen] = React.useState(false);
      const [deleteBook] = useDeleteBookMutation();

      const handleDelete = async () => {
        try {
          toast.loading("deleting book", { id: "delete" });
          await deleteBook(book._id);
          setOpen(false);
          toast.success("Book deleted successfully", { id: "delete" });
        } catch (error) {
          toast.error("Failed to delete book", { id: "delete" });
        }
      };
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/books/${book._id}`}>View Details</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link state={book} to={`/edit-book/${book._id}`}>
                  Edit book
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/borrow/${book._id}`}>Borrow Book</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteBookAlert
            open={open}
            onOpenChange={setOpen}
            onDelete={handleDelete}
          />
        </>
      );
    },
  },
];
