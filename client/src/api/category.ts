// import axios from './axios';
import axios from 'axios';

export default class Category {
  static getAll = () => {
    return axios.get('http://myjson.dit.upm.es/api/bins/bpxs');
  };

  static create = (name: string) => {
    return axios.post('http://myjson.dit.upm.es/api/bins/a6ds', { name });
  };

  static update = (category: { id: number; name: string }) => {
    return axios.post('http://myjson.dit.upm.es/api/bins/a6ds', {
      name: category.name
    });
  };
}
