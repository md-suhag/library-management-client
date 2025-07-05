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

export interface IBorrowBookRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowBookResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface IBorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface IBorrowSummaryResponse {
  success: boolean;
  message: string;
  data: IBorrowSummaryItem[];
}

export interface ISingleBookResponse {
  success: boolean;
  message: string;
  data: IBook;
}
export interface IAllBooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IDeleteBookResponse {
  success: boolean;
  message: string;
  data: null;
}
