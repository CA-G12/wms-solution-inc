import Product from '../models/ProductModel';
import { Product as ProductInterface } from 'interfaces/ProductInterface';

export const update = async (product: ProductInterface) => {
  const { id, title, description, icon, price, discount } = product;
  return await Product.update(
    { title, description, icon, price, discount },
    {
      where: {
        id: id
      },
      returning: true
    }
  );
};
