import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { designs } from "@/data/design";
import { Row } from "@tanstack/react-table";
import { PlusIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";

interface CardWithButtonProps {
  row: Row<Product>;
  onOpen: () => void;
  columnKey: string;
}

const CardWithButton = ({ row, onOpen, columnKey }: CardWithButtonProps) => {
  const designId = row.getValue(columnKey) as string;
  const design = designs.find((d) => d.id === designId);

  return (
    <Card className="group w-[var(--size)] !max-w-none h-full flex-shrink-0">
      <CardContent className="h-full flex flex-col items-center justify-center p-4 space-y-1">
        {designId ? (
          <>
            <Image
              width={500}
              height={500}
              className="w-full aspect-square rounded-md object-cover object-top"
              src={design?.image!}
              alt={design?.name!}
            />

            <p className="w-full font-medium line-clamp-1">{design?.name}</p>

            <Button
              variant="secondary"
              size="icon"
              className="absolute hidden group-hover:flex"
              onClick={onOpen}
            >
              <SquarePenIcon />
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={onOpen}>
            <PlusIcon />
            Add design
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardWithButton;
