import ProductModel from './ProductModel';
import UserModel from './UserModel';
import TransactionModel from './TransactionModel';
import TransactionProductModel from './TransactionProductModel';
import { sequelize } from '../db/connection';

export default () => {
  const Transaction = TransactionModel(sequelize);
  const TransactionProduct = TransactionProductModel(sequelize);
  const Product = ProductModel(sequelize, Transaction, TransactionProduct);
  const User = UserModel(sequelize, Transaction);
  return { Transaction, TransactionProduct, Product, User };
};

// export default {
//   ProductModel,
//   UserModel,
//   TransactionModel,
//   TransactionProductModel
// };
