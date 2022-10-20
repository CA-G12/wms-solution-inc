import { Response, Request, NextFunction } from 'express';
import { AuthHelper } from 'helpers/AuthHelper';

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  const errorMessage = {
    statusCode: '401',
    error: 'Unauthorized'
  };

  if (token) {
    const authHelper = new AuthHelper();
    try {
      const decoded = await authHelper.verifyToken(token);
      if (decoded) {
        req.user = decoded;
        next();
      }
    } catch {
      res.status(401).json(errorMessage);
    }
  } else {
    res.status(401).json(errorMessage);
  }
};
