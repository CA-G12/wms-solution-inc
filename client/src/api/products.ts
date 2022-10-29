import axios from './axios';
import { Product } from '../interfaces/ProductInterface';

export const getAllProductsAPI = () => axios.get('/products');

export const updateProductAPI = (id: number, updateProduct: Product) =>
  axios.put(`/products/${id}`, updateProduct);

export const deleteProductAPI = (id: number) => axios.delete(`/products/${id}`);
