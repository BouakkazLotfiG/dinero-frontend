import axios from 'axios';
import { BACKEND_URL } from '../api';

const BaseUrl = BACKEND_URL + '/expense/';
console.log(BaseUrl);

export const getExpenses = async () => {
  const response = await axios.get(`${BaseUrl}`);
  console.log(response);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(`${BaseUrl}/create`, expense);
  return response.data;
};

export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(`${BaseUrl}/delete/${expenseId}`);
  return response.data;
};

export const getTotalExpense = async () => {
  const response = await axios.get(`${BaseUrl}/total`);
  return response.data;
};
