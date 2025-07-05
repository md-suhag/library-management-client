export interface IBook {
  _id: string;
  title: string;
  description: string;
  genre: string;
  isbn: string;
  author: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export type GetAllBooksQueryArg = {
  page?: number;
  limit?: number;
  filter?: string;
  sortBy?: string;
  sort?: string;
};
