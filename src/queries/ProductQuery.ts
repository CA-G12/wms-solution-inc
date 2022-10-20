import { Product } from 'models/ProductModel';
import { InferAttributes } from 'sequelize/types/model';

export const update = async (product: InferAttributes<Product>) => {
  const { id, title, description, icon, price, discount } = product;
  try {
    const result = await Product.update(
      { title, description, icon, price, discount },
      {
        where: {
          id
        }
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
