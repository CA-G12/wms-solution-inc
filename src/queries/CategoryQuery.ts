import Category from '../models/CategoryModel';
import CategoryInterface from 'interfaces/CategoryInterface';
import { Op } from 'sequelize';
import { sequelize } from '../db/connection';
import Product from '../models/ProductModel';
export default class CategoryQuery {
  static create = async (name: string) => {
    return Category.create(
      { name },
      {
        returning: true
      }
    );
  };
  static update = async (category: CategoryInterface) => {
    const { id, name } = category;
    return Category.update(
      { name },
      {
        where: {
          id
        },
        returning: true
      }
    );
  };

  static delete = async (id: string) => {
    return Category.destroy({
      where: {
        id
      }
    });
  };

  static getCount = async () => {
    return Category.count();
  };

  static getAll = async (limit: number, offset: number) => {
    return Category.findAll({
      attributes: [
        'name',
        'Category.id',
        'Category.createdAt',
        [
          sequelize.fn('count', sequelize.col('Products.categoryId')),
          'productsCount'
        ]
      ],
      // order: [['Category.id', 'DESC']],
      // order: [['Category.createdAt', 'DESC']],
      include: [
        {
          model: Product,
          attributes: [],
          duplicating: false
        }
      ],
      group: ['name', 'Category.id', 'Category.createdAt'],
      raw: true,
      limit,
      offset
    });
  };

  static getByName = async (name: string, limit: number, offset: number) => {
    return Category.findAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
        [Op.like]: `%${name.toLowerCase()}%`
      }),
      attributes: [
        'name',
        'Category.id',
        'Category.createdAt',
        [
          sequelize.fn('count', sequelize.col('Products.categoryId')),
          'productsCount'
        ]
      ],
      // order: [['Category.createdAt', 'DESC']],
      include: [
        {
          model: Product,
          attributes: [],
          duplicating: false
        }
      ],
      group: ['name', 'Category.id', 'Category.createdAt'],
      raw: true,
      limit,
      offset
    });
  };
}
