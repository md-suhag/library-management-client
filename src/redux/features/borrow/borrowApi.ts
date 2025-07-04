import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/borrow`,
        body: data,
      }),
      invalidatesTags: [{ type: "books", id: "LIST" }],
    }),
    borrowSummary: builder.query({
      query: () => `/borrow`,
    }),
  }),
});

export const { useBorrowBookMutation, useBorrowSummaryQuery } = borrowApi;
