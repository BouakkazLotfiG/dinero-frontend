import axios from 'axios';
import { BACKEND_URL } from '../api';

const BaseUrl = BACKEND_URL + '/expense/';

export const getExpenses = async (page) => {
  const apiUrl = `${BaseUrl}?page=${page}`; // Adjust the URL and query parameters as per your backend API

  const response = await axios.get(apiUrl);
  console.log(response);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(`${BaseUrl}create`, expense);
  return response.data;
};

export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(`${BaseUrl}delete/${expenseId}`);
  return response.data;
};

export const getTotalExpense = async () => {
  const response = await axios.get(`${BaseUrl}total`);
  return response.data;
};
