import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "books", id }],
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBookQuery } = bookApi;
