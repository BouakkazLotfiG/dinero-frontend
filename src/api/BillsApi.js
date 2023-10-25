import axios from 'axios';
import { BACKEND_URL } from '../api';

const BaseUrl = BACKEND_URL + '/bills/';

export const getBills = async () => {
  const response = await axios.get(`${BaseUrl}`);
  return response.data;
};

export const addBill = async (expense) => {
  const response = await axios.post(`${BaseUrl}create`, expense);
  return response.data;
};

export const deleteBill = async (expenseId) => {
  const response = await axios.delete(`${BaseUrl}delete/${expenseId}`);
  return response.data;
};

// update bill by status
export const updateBill = async (pk, new_status) => {
  const response = await axios.put(`${BaseUrl}updatestatus/${pk}`, new_status);
  return response.data;
};
