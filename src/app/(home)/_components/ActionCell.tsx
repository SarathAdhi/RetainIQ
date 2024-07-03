import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ActionCellProps {
  addNewVariantColumn: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ addNewVariantColumn }) => (
  <div className="h-full grid place-content-center">
    <Button variant="outline" size="icon" onClick={addNewVariantColumn}>
      <PlusIcon />
    </Button>
  </div>
);

export default ActionCell;
