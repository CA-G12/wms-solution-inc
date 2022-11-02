import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import GenericError from '../helpers/GenericError';
import ProductQuery from '../queries/ProductQuery';
import { ProductRequest } from '../interfaces/ProductRequest';

export default class ProductController {
  static updateProduct = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { title, description, icon, price, discount } = req.body;

      const updatedProducts = await ProductQuery.update({
        id: Number(id),
        title,
        description,
        icon,
        price,
        discount
      });

      if (!updatedProducts) throw new GenericError('Not Found', 404);

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
      const { limit, offset } = req.query;
      const products = await sequelize.query(
        `select p.id,
                p.price,
                p.title,
                p.discount,
                p.icon,
                p.description,
                coalesce(
                    (
                        (
                            select SUM(tp.quantity)
                            from "TransactionProducts" as tp
                                join "Transactions" as t on t.id = tp."TransactionId"
                            where tp.status = 'closed'
                                and t.type = 'purchase'
                                and tp."ProductId" = p.id
                        ) - (
                            select SUM(tp.quantity)
                            from "TransactionProducts" as tp
                                join "Transactions" as t on t.id = tp."TransactionId"
                            where tp.status = 'closed'
                                and t.type = 'sale'
                                and tp."ProductId" = p.id
                        )
                    ),
                    0
                ) as "inStock"
            from "Products" as p LIMIT $1 OFFSET $2;`,
        {
          bind: [limit, offset],
          type: QueryTypes.SELECT
        }
      );
      const totalCount = await sequelize.query(
        `SELECT COUNT(*) FROM "Products"`,
        {
          type: QueryTypes.SELECT
        }
      );
      res.json({ products, totalCount });
    } catch (error) {
      next(error);
    }
  };

  static deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await ProductQuery.deleteProduct(Number(id));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
