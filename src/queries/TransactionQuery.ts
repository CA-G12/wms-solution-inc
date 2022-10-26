import { Op } from 'sequelize';
import { sequelize } from '../db/connection';
import Transaction from '../models/TransactionModel';
import TransactionProduct from '../models/TransactionProductModel';
import User from '../models/UserModel';

export default class TransactionQuery {
  static delete = async (id: string) => {
    return Transaction.destroy({
      where: {
        id
      }
    });
  };

  static getCount = async () => {
    return Transaction.count();
  };

  static search = async ({
    search,
    type,
    limit,
    offset
  }: {
    search: string;
    type: string;
    limit: number;
    offset: number;
  }) => {
    return Transaction.findAll({
      where: {
        [Op.and]: [
          type == 'purchase' || type == 'sale' ? { type: type } : {},
          sequelize.where(sequelize.fn('lower', sequelize.col('username')), {
            [Op.like]: `%${search.toLowerCase()}%`
          })
        ]
      },
      attributes: [
        'Transaction.id',
        'type',
        'Transaction.createdAt',
        'Transaction.updatedAt',
        [
          sequelize.fn(
            'count',
            sequelize.col('TransactionProducts.TransactionId')
          ),
          'productsCount'
        ],
        [
          sequelize.literal(
            'sum("TransactionProducts"."unitPrice" * "TransactionProducts"."quantity")'
          ),
          'totalCost'
        ]
      ],
      include: [
        {
          model: TransactionProduct,
          attributes: [],
          duplicating: false
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
      group: [
        'Transaction.id',
        'type',
        'Transaction.createdAt',
        'Transaction.updatedAt',
        'username'
      ],
      raw: true,
      limit,
      offset
    });
  };
}
