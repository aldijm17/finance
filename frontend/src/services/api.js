import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
// Fungsi untuk login
const login = (username, password) => {
  return axios.post(`${API_URL}/auth/signin`, { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
// Ekspor fungsi login
const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
// Fungsi untuk transaksi
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
