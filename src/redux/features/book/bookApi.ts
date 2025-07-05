import type { GetAllBooksQueryArg } from "@/types";
import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<any, GetAllBooksQueryArg>({
      query: ({ page = 0, limit = 10, filter, sortBy, sort } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (filter) params.append("filter", filter);
        if (sortBy) params.append("sortBy", sortBy);
        if (sort) params.append("sort", sort);
        return `/books?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Book",
                id: _id,
              })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: "Book", id }],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        method: "PUT",
        url: `/books/${id}`,
        body: data,
      }),
      invalidatesTags: (_, __, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/books`,
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/books/${id}`,
      }),
      invalidatesTags: (_, __, id) => [{ type: "Book", id }],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
} = bookApi;
