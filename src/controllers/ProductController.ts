import { Request, Response } from 'express';
import { sequelize } from '../db/connection';
import { QueryTypes } from 'sequelize';

const getProducts = async (req: Request, res: Response) => {
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
};
export { getProducts };
