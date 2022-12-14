import axios from './axios';

export const monthlyRevenue = (year: number) => {
  return axios.get(`/api/v1/analytics/revenue/${year}`);
};

export const totalStatistics = () => {
  return axios.get(`/api/v1/analytics/total`);
};

export const topSelling = () => {
  return axios.get(`/api/v1/analytics/topselling`);
};

export const stockAlert = () => {
  return axios.get(`/api/v1/analytics/stockalert`);
};
