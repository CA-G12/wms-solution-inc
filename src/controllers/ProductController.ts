import { Request, Response } from 'express';
import { update as updateQuery } from '../queries/ProductQuery';

export const updateProduct = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string);
  const { title, description, icon, price, discount } = req.body;

  try {
    const newProducts = await updateQuery({
      id,
      title,
      description,
      icon,
      price,
      discount
    });

    return newProducts;
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};
