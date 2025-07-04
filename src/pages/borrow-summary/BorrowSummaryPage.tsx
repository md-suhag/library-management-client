import { DataTable } from "@/components/ui/data-table";
import { borrowSummaryColumns } from "@/components/module/borrow/BorrowTableColumn";
import { useBorrowSummaryQuery } from "@/redux/features/borrow/borrowApi";

const BorrowSummaryPage = () => {
  const { data, isLoading, isError } = useBorrowSummaryQuery(undefined);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4">Error loading summary.</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      <DataTable columns={borrowSummaryColumns} data={data?.data ?? []} />
    </div>
  );
};

export default BorrowSummaryPage;
