import { columns } from "@/components/module/book/Columns";
import { DataTable } from "@/components/module/book/DataTable";
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";

import { useEffect } from "react";
import { useLocation } from "react-router";

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
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading books.</p>;
  }
  return (
    <div>
      {isFetching && <span className="text-sm ">Updating...</span>}
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default BooksPage;
