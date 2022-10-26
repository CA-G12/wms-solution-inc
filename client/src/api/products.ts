import axios from './axios';
import { Product } from '../interfaces/ProductInterface';

export const getAllProducts = () => axios.get('/products');
export const updateProduct = (id: number, newData: Product) =>
  axios.put(`/products/${id}`, newData);
