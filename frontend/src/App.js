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
        Routes >
        <
        div className = "App" >
        <
        Login / >
        <
        /div> <
        Route path = "/"
        element = { < Dashboard / > }
        /> <
        Route path = "/transactions"
        element = { < TransactionTable / > }
        /> <
        Route path = "/add"
        element = { < TransactionForm / > }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}

export default App;