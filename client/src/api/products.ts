import axios from './axios';
import { Product } from '../interfaces/ProductInterface';

export const getAllProductsAPI = () => axios.get('/products');
export const updateProductAPI = (id: number, newData: Product) =>
  axios.put(`/products/${id}`, newData);
export const deleteProductAPI = (id: number) => axios.put(`/products/${id}`);
