import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppContext } from "@/context/AppContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Table as RTTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { CSSProperties, useContext } from "react";
import SortableRow from "./SortableRow";

interface DraggableTableProps {
  table: RTTable<Product>;
}

const DraggableTable: React.FC<DraggableTableProps> = ({ table }) => {
  const {
    products: tableData,
    setProducts: setTableData,

    addNewProduct,
  } = useContext(AppContext);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tableData.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="bg-slate-50 border !rounded-xl p-4"
          style={
            {
              "--size": "13.5rem",
              "--left-2": "5.7rem",
            } as CSSProperties
          }
        >
          <Table className="border-none">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => (
                    <TableHead
                      key={header.id}
                      className={`group bg-slate-50 ${
                        i === 0
                          ? "sticky z-40 left-0 !w-10"
                          : i === 1
                          ? "sticky z-40 left-[var(--left-2)]"
                          : ""
                      }`}
                    >
                      <div className="font-semibold size-full border-r group-last:border-r-0 flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <SortableRow key={row.original.id} row={row} />
              ))}

              <TableRow>
                <TableCell className="sticky z-40 left-0">
                  <Button variant="outline" size="icon" onClick={addNewProduct}>
                    <PlusIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableTable;
