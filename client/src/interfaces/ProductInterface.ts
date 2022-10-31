export default interface TransactionInterface {
  id?: number;
  title: string;
  description: string;
  icon: string;
  price: number;
  discount: number;
  categoryId: number;
}
