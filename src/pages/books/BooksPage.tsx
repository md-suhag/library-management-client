import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types";
import React from "react";

const BooksPage = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
    refetchOnFocus: true,
  });
  console.log(data);
  return (
    <div>
      {data?.success &&
        data.data?.map((book: IBook) => (
          <div key={book._id} className="mb-4">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </div>
        ))}
    </div>
  );
};

export default BooksPage;
