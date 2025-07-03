import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: (result) =>
        result?.success
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
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} = bookApi;
