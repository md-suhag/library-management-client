import { columns } from "@/components/module/book/Columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import { Loader2 } from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import TableSkeleton from "@/components/shared/TableSkeleton";

const BooksPage = () => {
  const [page, setPage] = useState(0);

  const location = useLocation();
  const shouldRefetch = location.state?.shouldRefetch;
  const { data, isLoading, isError, isFetching, refetch } = useGetAllBooksQuery(
    { page }
  );

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

      <div className="flex justify-between mt-2">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span>
          Page {data?.pagination?.page + 1} of {data?.pagination?.totalPages}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page + 1 >= (data?.pagination?.totalPages ?? 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default BooksPage;
