import { Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import TransactionQuery from '../queries/TransactionQuery';
import { TransactionRequest } from '../interfaces/TransactionRequest';
import GenericError from '../helpers/GenericError';
import ProductQuery from '../queries/ProductQuery';
import { TransactionProduct as TransactionProductInterface } from 'interfaces/TransactionProductInterface';
export default class TransactionController {
  static createNewTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals?.user?.id;
      const { type, transactionProducts } = req.body;
      const transaction = await TransactionQuery.createNewTransaction({
        type,
        issuedBy: userId || 0,
        transactionProducts
      });

      res.json({
        status: 201,
        message: 'Success',
        transaction: transaction
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static updateOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
      const { type, transactionProducts } = req.body;
      const { id } = req.params;
      const transaction = await TransactionQuery.updateOneTransaction({
        id: Number(id),
        type,
        issuedBy: userId || 0,
        transactionProducts
      });

      res.json({
        status: 201,
        message: 'Success',
        transaction: transaction
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static deleteOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await TransactionQuery.deleteOneTransaction(Number(id));

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static getTransactions = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        id = '',
        type = '',
        search = '',
        offset = '0',
        limit = '20'
      } = req.query;
      const transactions = await TransactionQuery.getTransactions({
        id,
        type,
        search,
        limit: Number(limit),
        offset: Number(offset)
      });

      res.json({
        status: 200,
        message: 'Success',
        totalCount: transactions.count.length,
        items: transactions.rows
      });
    } catch (error) {
      next(error);
    }
  };

  static getOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const result = await TransactionQuery.getOneTransaction({
        id: Number(id)
      });

      const getProduct = async () => {
        const products: any[] = [];
        result.transactionProducts.forEach(async transProduct => {
          const product = ProductQuery.getProducts({
            id: transProduct.dataValues['ProductId'],
            barcode: '',
            title: '',
            categoryId: '',
            limit: 1000,
            offset: 0
          });

          products.push(product);
        });

        return Promise.all(products);
      };

      const products = (await getProduct()).flat();

      const transProducts: TransactionProductInterface[] = [];
      products.forEach(product => {
        const transProduct = result.transactionProducts.find(
          item => item.dataValues['ProductId'] == product.id
        );
        if (transProduct)
          transProducts.push({ ...transProduct?.dataValues, Product: product });
      });

      res.json({
        status: 200,
        transaction: {
          transaction: result.transaction,
          transactionProducts: transProducts
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
