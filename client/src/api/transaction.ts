import axios from './axios';

export const search = ({
  type,
  search,
  limit,
  offset
}: {
  type: string;
  search: string;
  limit: number;
  offset: number;
}) => {
  return axios.get(
    `transactions?search=${search}&type=${type}&limit=${limit}&offset=${offset}`
  );
};

export const remove = (id: number) => {
  return axios.delete(`/transactions/${id}`);
};
