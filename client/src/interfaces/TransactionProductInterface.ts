import { TransactionStatus } from './Enums';
import ProductInterface from './ProductInterface';

export interface TransactionProduct {
  id?: number;
  ProductId: number;
  status: TransactionStatus;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  Product: ProductInterface;
  TransactionId: number;
}
