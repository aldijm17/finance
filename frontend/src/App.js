import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import TransactionForm from './components/Transaction/TransactionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './services/api';

const PrivateRoute = ({ children }) => {
  const auth = AuthService.getCurrentUser();
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
            <PrivateRoute>
              <Dashboard /> 
            </PrivateRoute>
          } />
        <Route path="/add" element={
            <PrivateRoute>
            <TransactionForm />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
