import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import GenericError from '../helpers/GenericError';
import ProductQuery from '../queries/ProductQuery';

export default class ProductController {
  static updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id: number = parseInt(req.params.id as string);
    const { title, description, icon, price, discount } = req.body;

    try {
      const updatedProducts = await ProductQuery.update({
        id,
        title,
        description,
        icon,
        price,
        discount
      });

      if (!updatedProducts) throw new GenericError('Product is not found', 400);

      res.json({
        status: 200,
        message: 'Success',
        product: updatedProducts[1]
      });
    } catch (error) {
      next(error);
    }
  };

  static getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await sequelize.query(
        `select p.id,p.price,p.title,p.icon,p.description,coalesce(((select SUM(t.quantity) from "transactionProducts" as t join "Transactions" as ts on ts.id = t."TransactionId" where t.status = 'closed' and ts.type = 'purchase' and t."ProductId" = p.id)-(select
            SUM(t.quantity)
          from
            "transactionProducts" as t
            join "Transactions" as ts on ts.id = t."TransactionId"
          where
            t.status = 'closed'
            and ts.type = 'sale'
            and t."ProductId" = p.id)),0) as "inStock" from "Products" as p;`,
        {
          type: QueryTypes.SELECT
        }
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
}
