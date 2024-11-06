import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const transactionService = {
  getAllTransactions: async () => {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  },

  createTransaction: async (transactionData) => {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data;
  },

  getDashboardSummary: async () => {
    const response = await axios.get(`${API_URL}/transactions/dashboard`);
    return response.data;
  }
};