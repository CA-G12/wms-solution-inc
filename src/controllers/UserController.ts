import { Response, Request, NextFunction } from 'express';
import { LoginControllerRequest } from '../interfaces/AuthInterface';
import UserQuery from '../queries/UserQuery';
import authSchema from '../validation/userValidation';
import AuthHelper from '../helpers/AuthHelper';
import { validator } from '../validation/validator';
import GenericError from '../helpers/GenericError';
import { UserRequest } from '../interfaces/UserRequest';
import { ValidationError } from 'sequelize';

export default class UserController {
  static createNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password, email, role } = req.body;

      const hashedPassword = await AuthHelper.hashPassword(password);

      const user = await UserQuery.createNewUser({
        username,
        password: hashedPassword,
        email,
        role
      });

      res.json({
        status: 201,
        message: 'Success',
        user: user
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception.errors[0].message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static updateOneUser = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { username, password, email, role } = req.body;

      const hashedPassword = await AuthHelper.hashPassword(password);

      const user = await UserQuery.updateOneUser({
        id: Number(id),
        username,
        password: hashedPassword,
        email,
        role
      });

      if (!user) throw new GenericError('Not Found', 404);

      res.json({
        status: 200,
        message: 'Success',
        user: user[1]
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception.errors[0].message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static deleteOneUser = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await UserQuery.deleteOneUser(Number(id));

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static getUsers = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { search, limit, offset } = req.query;

      const users = await UserQuery.getUsers({
        search,
        limit: Number(limit),
        offset: Number(offset)
      });

      res.json({
        status: 200,
        message: 'Success',
        totalCount: users.count.length,
        items: users.rows
      });
    } catch (error) {
      next(error);
    }
  };
}
