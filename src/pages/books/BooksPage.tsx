import { columns } from "@/components/module/book/Columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import { Loader2 } from "lucide-react";

import { useEffect } from "react";
import { Link, useLocation } from "react-router";

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
    return (
      <div className="border rounded-lg overflow-hidden shadow">
        {/* Table header skeleton */}
        <div className="grid grid-cols-7 gap-2 p-4 bg-muted">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-6 w-full" />
          ))}
        </div>

        {/* Table body skeleton rows */}
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid grid-cols-7 gap-2 p-4 border-t border-border"
          >
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-4 w-full"
              />
            ))}
          </div>
        ))}
      </div>
    );
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

      <DataTable columns={columns} data={data?.data} />
    </section>
  );
};

export default BooksPage;
