import { Request, Response, NextFunction } from 'express';
import GenericError from '../helpers/GenericError';
import { update as updateQuery } from '../queries/ProductQuery';

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id as string);
  const { title, description, icon, price, discount } = req.body;

  try {
    const updatedProducts = await updateQuery({
      id,
      title,
      description,
      icon,
      price,
      discount
    });

    if (!updateProduct) throw new GenericError('Product is not found', 400);

    res.json({
      status: 200,
      message: 'Success',
      rowsCount: updatedProducts[0],
      rows: updatedProducts[1]
    });
  } catch (error) {
    next(error);
  }
};
