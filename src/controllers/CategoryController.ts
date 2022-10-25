import { Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import GenericError from '../helpers/GenericError';
import { CategoryRequest } from '../interfaces/CategoryRequest';
import CategoryQuery from '../queries/CategoryQuery';

export default class ProductController {
  static create = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      const created = await CategoryQuery.create(name);

      if (!created) throw new GenericError('Not Found', 404);

      res.json({
        status: 201,
        message: 'Success',
        category: created
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

  static update = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedCategory = await CategoryQuery.update({
        id: Number(id),
        name
      });

      if (!updatedCategory) throw new GenericError('Not Found', 404);

      res.json({
        status: 200,
        message: 'Success',
        category: updatedCategory[1]
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

  static delete = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await CategoryQuery.delete(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, offset } = req.body;
      const categories = await CategoryQuery.getAll(
        Number(limit),
        Number(offset)
      );
      console.log('categories....."', categories);

      const count = await CategoryQuery.getCount();
      res.json({
        status: 200,
        message: 'Success',
        rowsCount: count,
        limitedRowsCount: categories.length,
        rows: categories
      });
    } catch (error) {
      next(error);
    }
  };

  static getByName = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, offset, search = '' } = req.body;
      const categories = await CategoryQuery.getByName(
        search,
        Number(limit) || 20,
        Number(offset) || 0
      );
      const count = await CategoryQuery.getCount();

      res.json({
        status: 200,
        message: 'Success',
        rowsCount: count,
        limitedRowsCount: categories.length,
        rows: categories
      });
    } catch (error) {
      next(error);
    }
  };
}
