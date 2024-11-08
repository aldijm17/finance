import React, { useState, useEffect, useCallback } from "react";
import { transactionService } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

function TransactionTable() {
  const navigate = useNavigate();
  const goToTransactionForm = () => {
    navigate('/add'); // Navigates to the TransactionForm page
  };
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    bulan: "",
    tanggalMin: "",
    tanggalMax: "",
  });

  const applyFilters = useCallback(() => {
    let filteredData = [...transactions];

    if (filters.bulan) {
      filteredData = filteredData.filter(
        (transaction) => transaction.bulan === filters.bulan
      );
    }

    if (filters.tanggalMin) {
      filteredData = filteredData.filter(
        (transaction) =>
          new Date(transaction.tanggal) >= new Date(filters.tanggalMin)
      );
    }

    if (filters.tanggalMax) {
      filteredData = filteredData.filter(
        (transaction) =>
          new Date(transaction.tanggal) <= new Date(filters.tanggalMax)
      );
    }

    setFilteredTransactions(filteredData);
  }, [transactions, filters]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getAllTransactions();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div class="container">
      <div class="row mb-4 ">
        <div class="">
          <button onClick={goToTransactionForm} class="btn btn-primary col-md-12 fs-5 shadow-lg">
              Tambah Data
          </button>
        </div>
      </div>
      
      <div class="card mb-4 shadow-lg">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div class="mb-4">
                <h2 class="">Data keuangan test</h2>
                <div class="">
                  <div>
                    <label class="">Bulan</label>
                    <select
                      name="bulan"
                      value={filters.bulan}
                      onChange={handleFilterChange}
                      class="form-select"
                    >
                      <option value="">Semua Bulan</option>
                      {[
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                      ].map((month, index) => (
                        <option key={index} value={month}>
                          {" "}
                          {month}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Dari
              </label>
              <input
                type="date"
                name="tanggalMin"
                value={filters.tanggalMin}
                onChange={handleFilterChange}
                class="form-select"
              />
            </div>

            <div class="col-md-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Sampai
              </label>
              <input
                type="date"
                name="tanggalMax"
                value={filters.tanggalMax}
                onChange={handleFilterChange}
                class="form-select"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card table-responsive shadow-lg mb-5">
            <table class="table table-striped table-bordered  ">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    No
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Bulan
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Nama
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Pemasukan
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Pengeluaran
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Keterangan
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Jenis Pemasukan/Pengeluaran
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Tanggal
                  </th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">
                    Bukti TF
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.bulan}</td>
                    <td>{transaction.nama}</td>
                    <td>{transaction.pemasukan}</td>
                    <td>{transaction.pengeluaran}</td>
                    <td>{transaction.keterangan}</td>
                    <td>{transaction.jenis}</td>
                    <td>
                      {new Date(transaction.tanggal).toLocaleDateString()}
                    </td>
                    <td>{transaction.buktiTransfer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
