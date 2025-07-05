import { columns } from "@/components/module/book/Columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import { Loader2 } from "lucide-react";

import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import TableSkeleton from "@/components/shared/TableSkeleton";

const BooksPage = () => {
  const location = useLocation();
  const shouldRefetch = location.state?.shouldRefetch;
  const { data, isLoading, isError, isFetching, refetch } =
    useGetAllBooksQuery(undefined);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch, refetch]);
  if (isLoading) {
    return <TableSkeleton column={7} row={5} />;
  }

  if (isError) {
    return <p>Error loading books.</p>;
  }
  return (
    <section className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-foreground">Books</h1>

        <div className="flex items-center gap-4">
          {isFetching && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating...</span>
            </div>
          )}
          <Button asChild>
            <Link to="/create-book">Add Book</Link>
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={data?.data ?? []} />
    </section>
  );
};

export default BooksPage;
