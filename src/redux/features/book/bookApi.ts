import type {
  IAllBooksResponse,
  GetAllBooksQueryArg,
  IBook,
  IDeleteBookResponse,
  ISingleBookResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<IAllBooksResponse, GetAllBooksQueryArg>({
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
                type: "Book" as const,
                id: _id,
              })),
              { type: "Book" as const, id: "LIST" },
            ]
          : [{ type: "Book" as const, id: "LIST" }],
    }),
    getSingleBook: builder.query<ISingleBookResponse, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: "Book", id }],
    }),
    updateBook: builder.mutation<
      ISingleBookResponse,
      Partial<IBook> & { id: string }
    >({
      query: ({ id, ...data }) => ({
        method: "PUT",
        url: `/books/${id}`,
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Book" as const, id: arg.id }],
    }),
    createBook: builder.mutation<ISingleBookResponse, Partial<IBook>>({
      query: (data) => ({
        method: "POST",
        url: `/books`,
        body: data,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
    deleteBook: builder.mutation<IDeleteBookResponse, string>({
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
