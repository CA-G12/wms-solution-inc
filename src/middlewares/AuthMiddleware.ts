import { Response, Request, NextFunction } from 'express';
import { AuthHelper } from '../helpers/AuthHelper';
import GenericError from '../helpers/GenericError';
import { UserQuery } from '../queries/UserQuery';

const userQuery = new UserQuery();

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHelper = new AuthHelper();

    const { token } = req.cookies;
    if (!token) throw new GenericError('Unauthorized', 401);

    const { id }: any = await authHelper.verifyToken(token);
    if (!id) throw new GenericError('Unauthorized', 401);

    const user = await userQuery.getUser({
      filter: { id },
      attributes: ['id', 'username', 'email', 'password', 'role']
    });

    if (!user) throw new GenericError('Internal Server Error', 500);

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    next(error);
  }
};
