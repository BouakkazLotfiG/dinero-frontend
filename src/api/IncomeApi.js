import axios from 'axios';
import { BACKEND_URL } from '../api';

const BaseUrl = BACKEND_URL + '/income/';

export const getIncomes = async () => {
  const response = await axios.get(`${BaseUrl}`);
  console.log(response.data);
  return response.data;
};

export const addIncome = async (income) => {
  const response = await axios.post(`${BaseUrl}/create`, income);
  return response.data;
};

export const deleteIncome = async (incomeId) => {
  const response = await axios.delete(`${BaseUrl}/delete/${incomeId}`);
  return response.data;
};

// get total income
export const getTotalIncome = async () => {
  const response = await axios.get(`${BaseUrl}/total`);
  return response.data;
};
