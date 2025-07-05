import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const borrowFormSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  dueDate: z.date({ required_error: "Due date is required" }),
});

const BorrowBookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location?.state;
  const [borrowBook] = useBorrowBookMutation();
  const form = useForm<z.infer<typeof borrowFormSchema>>({
    resolver: zodResolver(borrowFormSchema),
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof borrowFormSchema>) => {
    const formattedBorrowData = {
      ...values,
      dueDate: values.dueDate.toISOString(),
      book: book?._id,
    };

    try {
      toast.loading("Borrowing book...", { id: "borrow" });
      await borrowBook(formattedBorrowData).unwrap();
      toast.success("Borrowed successfully", { id: "borrow" });
      form.reset();
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to borrow book", {
        id: "borrow",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto p-4 bg-accent rounded-lg shadow-md"
        >
          <h1 className="text-2xl text-center m-2">Borrow Book</h1>
          <p className=" text-center font-semibold">
            book name : {book?.title}
          </p>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Quantity of books to borrow"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Borrow</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBookForm;
