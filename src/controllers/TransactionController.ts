import { Response, NextFunction } from 'express';
import TransactionQuery from '../queries/TransactionQuery';
import { TransactionRequest } from '../interfaces/TransactionRequest';

export default class CategoryController {
  static delete = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await TransactionQuery.delete(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static search = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type = '', search = '', offset = '0', limit = '20' } = req.query;
      const categories = await TransactionQuery.search({
        type,
        search,
        limit: Number(limit),
        offset: Number(offset)
      });
      const count = await TransactionQuery.getCount();

      res.json({
        status: 200,
        message: 'Success',
        totalCount: count,
        items: categories
      });
    } catch (error) {
      next(error);
    }
  };
}
