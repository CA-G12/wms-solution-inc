import axios from './axios';

export default class Category {
  static getAll = ({ limit, offset }: { limit: number; offset: number }) => {
    return axios.post('/categories/all', { limit, offset });
  };

  static getByName = ({
    name,
    limit,
    offset
  }: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    return axios.post('/categories/search', { search: name, limit, offset });
  };

  static create = (name: string) => {
    return axios.post(`/categories/`, { name });
  };

  static update = ({ id, name }: { id: number; name: string }) => {
    return axios.put(`/categories/${id}`, { name });
  };

  static delete = (id: number) => {
    return axios.delete(`/categories/${id}`);
  };
}
