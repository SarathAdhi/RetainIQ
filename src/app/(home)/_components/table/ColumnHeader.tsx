import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";

interface ColumnHeaderProps {
  header: string;
  columnKey: string;
  deleteVariantColumn: (columnKey: string) => void;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  header,
  columnKey,
  deleteVariantColumn,
}) => (
  <div className="w-full flex items-center justify-between pr-4">
    <p>{header}</p>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVerticalIcon className="stroke-black size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deleteVariantColumn(columnKey)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default ColumnHeader;
