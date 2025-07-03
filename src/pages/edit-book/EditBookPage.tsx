import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBookMutation } from "@/redux/features/book/bookApi";
import { toast } from "sonner";
import { type IBook } from "./../../types/index";

const EditBookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location?.state;
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const form = useForm({
    defaultValues: {
      title: book.title,
      description: book.description,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      copies: book.copies,
    },
  });
  type OnSubmitValues = Pick<
    IBook,
    "title" | "description" | "author" | "genre" | "isbn" | "copies"
  >;

  async function onSubmit(values: OnSubmitValues) {
    toast.loading("Updating book...", { id: "update" });
    try {
      await updateBook({
        id: book._id,
        ...values,
      }).unwrap();

      toast.success("Book updated successfully", { id: "update" });
      form.reset();
      navigate("/", { state: { shouldRefetch: true } });
    } catch (error) {
      toast.error("Failed to update book", { id: "update" });
    }
  }

  // console.log(result);
  if (!book) {
    return <p>No book data available.</p>;
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto p-4 bg-accent rounded-lg shadow-md"
        >
          <h1 className="text-2xl text-center m-2">Edit Book</h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="book title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="book description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="author name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input placeholder="book Genre" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Isbn</FormLabel>
                <FormControl>
                  <Input placeholder="book isbn number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input placeholder="Total book copies" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={isLoading} className="" type="submit">
              {isLoading ? "Updating" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditBookPage;
