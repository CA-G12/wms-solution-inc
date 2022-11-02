import axios from './axios';
import { Product } from '../interfaces/ProductInterface';

export const getAllProductsAPI = (limit: number, offset: number) =>
  axios.get('/products', { params: { limit, offset } });

export const updateProductAPI = (id: number, updateProduct: Product) =>
  axios.put(`/products/${id}`, updateProduct);

export const deleteProductAPI = (id: number) => axios.delete(`/products/${id}`);
