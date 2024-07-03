import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import ProductDataTable from "./_components/table/ProductDataTable";

const HomePage = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon />

          <div className="w-96">
            <h1 className="pl-2 text-3xl font-bold font-recoleta">
              Rules creation
            </h1>

            <hr className="w-full bg-black border-black h-px" />
          </div>
        </div>

        <Button variant="success">Publish Feed</Button>
      </div>

      <ProductDataTable />
    </div>
  );
};

export default HomePage;
