import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "books",
                id: _id,
              })),
              { type: "books", id: "LIST" },
            ]
          : [{ type: "books", id: "LIST" }],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: "books", id }],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        method: "PUT",
        url: `/books/${id}`,
        body: data,
      }),
      invalidatesTags: (_, __, id) => [{ type: "books", id }],
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
      invalidatesTags: (_, __, id) => [{ type: "books", id }],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useCreateBookMutation,
} = bookApi;
