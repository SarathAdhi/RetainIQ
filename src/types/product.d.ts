interface Product {
  id: string;
  primary_variant: string;
  filters: {
    field?: string;
    operator?: string;
    value?: string;
  }[];
  [key: string]: string;
}
