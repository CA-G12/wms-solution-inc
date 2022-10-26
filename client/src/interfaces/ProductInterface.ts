export interface Product {
  id?: string;
  title: string;
  price: number;
  discount: number;
  inStock: number;
  createdAt: number;
  actions: {
    open: void;
    edit: void;
    delete: void;
  };
}
