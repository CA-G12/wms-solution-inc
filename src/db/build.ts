import models from '../models';
import { Role } from '../interfaces/UserInterface';
import {
  TransactionStatus,
  TransactionType
} from '../interfaces/transactionInterface';
import { sequelize } from './connection';

const { Transaction, TransactionProduct, Product, User } = models();
const Products = [
  {
    title: 'product1',
    description: 'desc1',
    icon: '*******',
    price: 6,
    discount: 12
  },
  {
    title: 'product2',
    description: 'desc2',
    icon: '////////',
    price: 20,
    discount: 3
  },
  {
    title: 'product3',
    description: 'desc3',
    icon: '----------',
    price: 14,
    discount: 9
  }
];

const transactions = [
  { type: TransactionType.Purchase },
  { type: TransactionType.Purchase },
  { type: TransactionType.Sale },
  { type: TransactionType.Sale },
  { type: TransactionType.Sale }
];

const transactionProduct = [
  // purchase
  {
    unitPrice: 15,
    quantity: 500,
    ProductId: 1,
    TransactionId: 1,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 35,
    quantity: 150,
    ProductId: 2,
    TransactionId: 1,
    status: TransactionStatus.Reversed
  },

  {
    unitPrice: 15,
    quantity: 50,
    ProductId: 3,
    TransactionId: 1,
    status: TransactionStatus.Pending
  },
  {
    unitPrice: 35,
    quantity: 80,
    ProductId: 2,
    TransactionId: 2,
    status: TransactionStatus.Closed
  },
  // SELL *******************
  {
    unitPrice: 15,
    quantity: 20,
    ProductId: 1,
    TransactionId: 3,
    status: TransactionStatus.Closed
  },

  {
    unitPrice: 15,
    quantity: 35,
    ProductId: 2,
    TransactionId: 3,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 15,
    quantity: 40,
    ProductId: 1,
    TransactionId: 4,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 15,
    quantity: 15,
    ProductId: 2,
    TransactionId: 5,
    status: TransactionStatus.Closed
  }
];

const populateDB = async (
  Transaction: any,
  TransactionProduct: any,
  Product: any,
  User: any
): Promise<void> => {
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    {
      username: 'admin',
      password: '123456',
      email: 'admin@homtail.com',
      role: Role.admin
    }
  ]);
  await Transaction.bulkCreate(transactions);
  await Product.bulkCreate(Products);
  await TransactionProduct.bulkCreate(transactionProduct);
};

(async () => {
  try {
    // const { Transaction, TransactionProduct, Product, User } = initDB();
    populateDB(Transaction, TransactionProduct, Product, User);
    console.log('Build Database Successfully');
  } catch (error) {
    console.log('Build Database Failed', error);
  }
})();
