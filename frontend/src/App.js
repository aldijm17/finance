import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionForm from './components/Transaction/TransactionForm';
import TransactionTable from './components/Transaction/TransactionTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div>
      <Dashboard/>
      <Outlet /> {/* Renders child components inside Dashboard */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<TransactionTable />} />
          <Route path="/add" element={<TransactionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
