import { Skeleton } from "../ui/skeleton";

const TableSkeleton = ({ column = 7, row = 5 }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      {/* Table header */}
      <div
        className="grid gap-2 p-4 bg-muted"
        style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: column }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-6 w-full" />
        ))}
      </div>

      {/* Table body rows */}
      {Array.from({ length: row }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-2 p-4 border-t border-border"
          style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: column }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-4 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
