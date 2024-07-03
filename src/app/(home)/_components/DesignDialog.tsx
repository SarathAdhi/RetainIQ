import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { designs } from "@/data/design";
import { ImageIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface DesignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductVariant: { productId: string; variantId: string };
}

const DesignDialog = ({
  isOpen,
  onClose,
  selectedProductVariant,
}: DesignDialogProps) => {
  const { products: tableData, setProducts: setTableData } =
    useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleInsertDesign = (designId: string) => {
    const updatedTableData = tableData.map((item) => {
      if (item.id === selectedProductVariant.productId) {
        return { ...item, [selectedProductVariant.variantId]: designId };
      }
      return item;
    });
    setTableData(updatedTableData);
    onClose();
  };

  const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setSearchQuery("");
      }}
    >
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <DialogHeader className="border-b p-6">
          <div>
            <div className="-top-5 -left-5 absolute -z-10">
              <div className="w-fit border rounded-full p-4">
                <div className="w-fit border rounded-full p-4">
                  <div className="w-fit border rounded-full p-4">
                    <ImageIcon className="stroke-green-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Select a design to link</h2>
              <div className="max-w-52 relative">
                <SearchIcon className="size-5 absolute top-2.5 left-2.5" />
                <Input
                  className="h-10 pl-10"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 grid grid-cols-4 gap-4 max-h-[60vh] overflow-auto">
          {filteredDesigns.map((design) => (
            <div key={design.id} className="space-y-1 group">
              <div className="aspect-square relative">
                <Image
                  width={500}
                  height={500}
                  className="aspect-square rounded-md object-cover object-top"
                  src={design?.image}
                  alt={design?.name}
                />

                <Button
                  size="sm"
                  variant="secondary"
                  className="hidden group-hover:block absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] hover:bg-slate-50"
                  onClick={() => handleInsertDesign(design.id)}
                >
                  Insert
                </Button>
              </div>

              <p className="text-sm font-medium">{design?.name}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignDialog;
