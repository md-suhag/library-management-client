import { columns } from "@/components/module/book/Columns";
import { DataTable } from "@/components/module/book/DataTable";
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types";
import React, { useEffect } from "react";

const BooksPage = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
    refetchOnFocus: true,
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading books.</p>}
      {data?.success && <DataTable columns={columns} data={data.data} />}
    </div>
  );
};

export default BooksPage;
