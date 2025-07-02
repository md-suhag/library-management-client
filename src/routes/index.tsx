import MainLayout from "@/components/layout/MainLayout";
import BooksPage from "@/pages/books/BooksPage";
import BorrowSummaryPage from "@/pages/borrow-summary/BorrowSummaryPage";
import BorrowPage from "@/pages/borrow/BorrowPage";
import CreateBookPage from "@/pages/create-book/CreateBookPage";
import EditBookPage from "@/pages/edit-book/EditBookPage";
import SingleBookPage from "@/pages/single-book/SingleBookPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BooksPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "create-book",
        element: <CreateBookPage />,
      },
      {
        path: "books/:id",
        element: <SingleBookPage />,
      },
      {
        path: "edit-book/:id",
        element: <EditBookPage />,
      },
      {
        path: "borrow/:id",
        element: <BorrowPage />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummaryPage />,
      },
    ],
  },
]);

export default router;
