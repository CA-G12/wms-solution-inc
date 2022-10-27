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
    return Transaction.findAndCountAll({
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
        'User.username',
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
          model: User,
          attributes: [],
          duplicating: false
        },
        {
          model: TransactionProduct,
          attributes: [],
          duplicating: false
        }
      ],
      group: [
        'Transaction.id',
        'type',
        'Transaction.createdAt',
        'Transaction.updatedAt',
        'User.username'
      ],
      raw: true,
      limit,
      offset
    });
  };
}
