import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/borrow`,
        body: data,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }, "Borrow"],
    }),
    borrowSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useBorrowSummaryQuery } = borrowApi;
