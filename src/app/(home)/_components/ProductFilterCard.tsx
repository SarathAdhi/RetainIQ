import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { PlusIcon } from "lucide-react";

interface Props {
  filters: Product["filters"];
  withHoverCard?: boolean;
}

const ProductFilterCard = ({ filters, withHoverCard = true }: Props) => {
  const isFilterExist = filters.length > 0;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    withHoverCard && isFilterExist ? (
      <HoverCard>
        <HoverCardTrigger>{children}</HoverCardTrigger>

        <HoverCardContent
          className="w-full -mt-[10.5rem]"
          align="start"
          alignOffset={10}
        >
          <ProductFilterCard filters={filters} withHoverCard={false} />
        </HoverCardContent>
      </HoverCard>
    ) : (
      <Slot>{children}</Slot>
    );

  return (
    <Wrapper>
      <Card
        className={cn(
          "relative h-full flex-shrink-0",
          withHoverCard ? "w-96" : "w-full"
        )}
      >
        <CardContent className="group/filtercard p-4 flex items-center justify-center h-full">
          <div
            className={cn("flex items-center justify-center gap-2", {
              "flex-wrap": withHoverCard,
            })}
          >
            {isFilterExist ? (
              filters?.map((filter, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2"
                >
                  {filter.field && (
                    <Badge variant="outline" className="flex-shrink-0">
                      {filter.field}
                    </Badge>
                  )}
                  {filter.operator && (
                    <Badge variant="success" className="flex-shrink-0">
                      {filter.operator}
                    </Badge>
                  )}
                  {filter.value && (
                    <Badge variant="outline" className="flex-shrink-0">
                      {filter.value}
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <Button variant="outline">
                <PlusIcon />
                Add Product Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default ProductFilterCard;
