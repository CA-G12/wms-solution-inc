import { DecimalDataType } from 'sequelize';
import { TransactionStatus } from './TransactionInterface';

export interface TransactionProduct {
  id?: number;
  ProductId: number;
  status: TransactionStatus;
  unitPrice: DecimalDataType;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  TransactionId: number;
}
