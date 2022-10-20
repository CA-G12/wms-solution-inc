import { Response, Request } from 'express';
import { AuthHelper } from 'helpers/AuthHelper';

export const checkLogin = async (req: Request, res: Response) => {
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
        res.status(401).json({
          statusCode: 200,
          message: 'success',
          user: decoded
        });
      }
    } catch {
      res.status(401).json(errorMessage);
    }
  } else {
    res.status(401).json(errorMessage);
  }
};
