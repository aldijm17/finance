import React from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionForm from './components/Transaction/TransactionForm';
import TransactionTable from './components/Transaction/TransactionTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return ( <
        BrowserRouter >
        <
        div className = "App" >
        <
        Routes >
        <
        Route path = "/"
        element = { < Dashboard / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/transactions"
        element = { < TransactionTable / > }
        /> <
        Route path = "/add"
        element = { < TransactionForm / > }
        /> <
        /Routes> <
        /div> <
        /BrowserRouter>
    );
}

export default App;