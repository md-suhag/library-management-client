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
  }),
});

export const { useBorrowBookMutation } = borrowApi;
