import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
// import TransactionForm from './components/Transaction/TransactionForm';
import TransactionTable from './components/Transaction/TransactionTable';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      {/* <Route path="add" element={<TransactionForm/>}/> */}
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div>
            <Dashboard />
            </div>
          </div>
        </div>
        <div class="row">
          {/* Transaction Table Section */}
          <div class="col-md-12">
            <div>
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
