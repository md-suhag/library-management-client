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
