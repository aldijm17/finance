import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionForm from './components/Transaction/TransactionForm';
import TransactionTable from './components/Transaction/TransactionTable';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionTable />} />
        <Route path="/add" element={<TransactionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
