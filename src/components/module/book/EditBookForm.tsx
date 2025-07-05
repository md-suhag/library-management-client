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

import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
const editBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  genre: z
    .string()
    .refine(
      (val) =>
        [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ].includes(val),
      { message: "Genre is required" }
    ),
  isbn: z
    .string()
    .regex(/^\d{10}$|^\d{13}$/, "ISBN must be 10 or 13 digits long"),
  copies: z.string().min(1, "At least one copy is required"),
});
const EditBookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location?.state;
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const form = useForm<z.infer<typeof editBookSchema>>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: book.title,
      description: book.description,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      copies: book.copies.toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof editBookSchema>) => {
    toast.loading("Updating book...", { id: "update" });
    try {
      await updateBook({
        id: book._id,
        ...values,
        isbn: values.isbn,
        copies: parseInt(values.copies),
      }).unwrap();

      toast.success("Book updated successfully", { id: "update" });
      form.reset();
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update book", {
        id: "update",
      });
    }
  };

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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
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

export default EditBookForm;
