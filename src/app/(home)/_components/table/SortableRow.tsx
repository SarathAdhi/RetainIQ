import { TableCell, TableRow } from "@/components/ui/table";
import { AppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import { GripIcon, Trash2Icon } from "lucide-react";
import { CSSProperties, useCallback, useContext, useMemo } from "react";

const SortableRow = ({ row }: { row: Row<Product> }) => {
  const { deleteProduct } = useContext(AppContext);

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging,
  } = useSortable({ id: row.original.id });

  const style: CSSProperties = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1000 : 0,
    }),
    [transform, transition, isDragging]
  );

  const handleDeleteProduct = useCallback(() => {
    deleteProduct(row.original.id);
  }, [deleteProduct, row.original.id]);

  return (
    <TableRow ref={setNodeRef} style={style} className="group">
      {row.getVisibleCells().map((cell, i) => {
        const isDraggableColumn = cell.column.id === "draggable";
        const isSticky = i === 1;

        return (
          <TableCell
            key={cell.id}
            className={cn(
              "z-40",
              isDraggableColumn
                ? "bg-slate-50 h-[var(--size)] sticky w-10 left-0"
                : "size-[var(--size)] pl-2 flex-shrink-0 group bg-slate-50",
              isSticky && "sticky left-[var(--left-2)]"
            )}
          >
            <div
              className={cn(
                isDraggableColumn
                  ? "h-full relative flex items-center gap-1 pr-4 border-r group-last:border-r-0"
                  : "bg-slate-50 size-full pr-6 border-r group-last:border-r-0"
              )}
            >
              {isDraggableColumn ? (
                <>
                  <h2 className="text-2xl font-bold">{parseInt(row.id) + 1}</h2>
                  <button
                    className="cursor-grab"
                    {...attributes}
                    {...listeners}
                  >
                    <GripIcon />
                  </button>
                  <button
                    className="z-20 absolute mb-16 ml-2 group-hover:block hidden"
                    onClick={handleDeleteProduct}
                  >
                    <Trash2Icon className="size-6 stroke-red-600" />
                  </button>
                </>
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default SortableRow;
