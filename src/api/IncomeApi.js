import axios from 'axios';
import { BACKEND_URL } from '../api';

const BaseUrl = BACKEND_URL + '/income/';

export const getIncomes = async (page) => {
  const apiUrl = `${BaseUrl}?page=${page}`;

  const response = await axios.get(apiUrl);
  console.log(response);
  return response.data;
};

export const addIncome = async (income) => {
  const response = await axios.post(`${BaseUrl}create`, income);
  return response.data;
};

export const deleteIncome = async (pk) => {
  const response = await axios.delete(`${BaseUrl}delete/${pk}`);
  console.log(response);
  return response;
};

// get total income
export const getTotalIncome = async () => {
  const response = await axios.get(`${BaseUrl}total`);
  return response.data;
};
