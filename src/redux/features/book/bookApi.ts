import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
