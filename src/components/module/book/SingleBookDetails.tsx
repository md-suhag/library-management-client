import { Link, useParams } from "react-router";
import { useGetSingleBookQuery } from "@/redux/features/book/bookApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SingleBookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const book = data?.data;
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {isLoading ? (
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </Card>
      ) : book ? (
        <Card className="shadow-lg border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              by {book.author}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Genre</p>
                <p className="text-lg">{book.genre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ISBN</p>
                <p className="text-lg">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Copies</p>
                <p className="text-lg">{book.copies}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <Badge variant={book.available ? "default" : "destructive"}>
                  {book.available ? "Yes" : "No"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="leading-relaxed">{book.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6">
              <div className="text-sm text-muted-foreground">
                <p>Created: {new Date(book.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
              </div>
              <Button asChild className="mt-4 sm:mt-0" variant="default">
                <Link state={book} to={`/borrow/${book._id}`}>
                  Borrow Book
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-red-500 font-semibold">
          No book found.
        </div>
      )}
    </div>
  );
};

export default SingleBookDetails;
