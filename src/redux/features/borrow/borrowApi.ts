import type {
  IBorrowBookResponse,
  IBorrowSummaryResponse,
  IBorrowBookRequest,
} from "@/types";
import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrowBookResponse, IBorrowBookRequest>({
      query: (data) => ({
        method: "POST",
        url: `/borrow`,
        body: data,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }, "Borrow"],
    }),
    borrowSummary: builder.query<IBorrowSummaryResponse, void>({
      query: () => `/borrow`,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useBorrowSummaryQuery } = borrowApi;
