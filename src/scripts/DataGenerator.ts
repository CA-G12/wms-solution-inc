import { faker } from '@faker-js/faker';
import fs from 'fs';
import { join } from 'path';
import { User, Role } from '../interfaces/UserInterface';
import ProductInterface from '../interfaces/ProductInterface';
import {
  Transaction,
  TransactionStatus,
  TransactionType
} from '../interfaces/TransactionInterface';
import { TransactionProduct } from 'interfaces/TransactionProductInterface';

export default class DataGenerator {
  static PRODUCTS_COUNT = 100;

  static getRandomIndex(length: number) {
    return Math.ceil(Math.random() * length);
  }

  static generateUsers(): User[] {
    return [...Array(100)].map((_, i) => ({
      username: faker.internet.userName(),
      password: '$2a$10$Zco2hCwKBrjQ4v/Xcxb9P.U0Rvp5PxgY9F2tfJJqv16vvcJCxwzka',
      email: faker.internet.email(),
      role: i + 1 === 1 ? Role.admin : Role.customer,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateProducts(): ProductInterface[] {
    return [...Array(this.PRODUCTS_COUNT)].map((_, i) => ({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      icon: faker.internet.avatar(),
      price: Number(faker.commerce.price(20, 2000)),
      discount: Number(faker.commerce.price(0, 100)) / 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateTransactions(): Transaction[] {
    return [...Array(100)].map((_, i) => {
      const type = faker.helpers.objectValue(TransactionType);
      return {
        status: faker.helpers.objectValue(TransactionStatus),
        type,
        issuedBy:
          type === TransactionType.Sale
            ? faker.datatype.number({ min: 2, max: 100 })
            : 1,
        createdAt: new Date(), //TODO get dates ranged, for analytics
        updatedAt: new Date()
      };
    });
  }

  static generateTransactionsProducts(): TransactionProduct[] {
    const transProdsArr: TransactionProduct[] = [];
    for (let i = 0; i < 1000; i++) {
      const productId = this.getRandomIndex(100);
      const transactionId = this.getRandomIndex(100);
      const isDuplicated: boolean = transProdsArr.some(
        (obj: TransactionProduct) =>
          obj.productId === productId && obj.transactionId === transactionId
      );
      !isDuplicated &&
        transProdsArr.push({
          productId,
          transactionId,
          unitPrice: Number(faker.commerce.price()),
          quantity: Number((+faker.finance.amount(1, 1000)).toFixed()),
          createdAt: new Date(),
          updatedAt: new Date()
        });
    }
    return transProdsArr;
  }
}
