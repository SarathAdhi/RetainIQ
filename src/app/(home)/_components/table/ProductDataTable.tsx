"use client";

import { AppContext } from "@/context/AppContext";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import ActionCell from "../ActionCell";
import CardWithButton from "../CardWithButton";
import DesignDialog from "../DesignDialog";
import ProductFilterCard from "../ProductFilterCard";
import ColumnHeader from "./ColumnHeader";
import DraggableTable from "./DraggableTable";

const ProductDataTable = () => {
  const {
    products: tableData,
    tableColumns,
    addNewVariantColumn,
    deleteVariantColumn,
  } = useContext(AppContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState({
    productId: "",
    variantId: "",
  });

  const handleDialogOpen = (productId: string, variantId: string) => {
    setSelectedProductVariant({ productId, variantId });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "draggable",
      header: "",
    },
    {
      accessorKey: "product_filter",
      header: () => <span className="w-full text-center">Product Filter</span>,
      cell: ({ row }) => <ProductFilterCard filters={row.original.filters} />,
      maxSize: 20,
    },
    ...tableColumns.map(
      ({ key, header }) =>
        ({
          accessorKey: key,
          header: () => (
            <ColumnHeader
              header={header}
              key={key}
              columnKey={key}
              deleteVariantColumn={deleteVariantColumn}
            />
          ),
          cell: ({ row }) => (
            <CardWithButton
              row={row}
              columnKey={key}
              onOpen={() => handleDialogOpen(row.original.id, key)}
            />
          ),
          maxSize: 10,
        } as ColumnDef<Product>)
    ),
    {
      accessorKey: "action",
      header: "",
      cell: () => <ActionCell addNewVariantColumn={addNewVariantColumn} />,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DraggableTable table={table} />

      <DesignDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        selectedProductVariant={selectedProductVariant}
      />
    </>
  );
};

export default ProductDataTable;
