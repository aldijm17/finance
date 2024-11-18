import React, { useState, useEffect, useCallback } from "react";
import { transactionService } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/api';

function TransactionTable() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const goToTransactionForm = () => {
    navigate('/add');
  };
  
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    bulan: "",
    tanggalMin: "",
    tanggalMax: "",
    jenisTransaksi: "",
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

    if (filters.jenisTransaksi) {
      filteredData = filteredData.filter(
        (transaction) =>
          (filters.jenisTransaksi === "Pemasukan" && transaction.pemasukan > 0) ||
          (filters.jenisTransaksi === "Pengeluaran" && transaction.pengeluaran > 0)
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

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row mb-4 ">
        <div className="">
          <button onClick={goToTransactionForm} className="btn btn-primary col-md-12 fs-5 shadow-lg">
              Tambah Data
          </button>
        </div>
      </div>
      <div className="card mb-4 shadow-lg">
        <div className="card-body">
          <div className="row mb-3">
            <h2>Filter Data</h2>
            <div className="col-md-6">
              <label>Bulan</label>
              <select
                name="bulan"
                value={filters.bulan}
                onChange={handleFilterChange}
                className="form-select"
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
                    {month}
                  </option>
                ))}
              </select>         
            </div>
            <div className="col-md-6">
              <label>
                Jenis Transaksi
              </label>
              <select
                name="jenisTransaksi"
                value={filters.jenisTransaksi}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Semua</option>
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>
                Tanggal Dari
              </label>
              <input
                type="date"
                name="tanggalMin"
                value={filters.tanggalMin}
                onChange={handleFilterChange}
                className="form-select"
              />
            </div>

            <div className="col-md-6">
              <label>
                Tanggal Sampai
              </label>
              <input
                type="date"
                name="tanggalMax"
                value={filters.tanggalMax}
                onChange={handleFilterChange}
                className="form-select"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card table-responsive shadow-lg mb-5">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">No</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Bulan</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Nama</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Pemasukan</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Pengeluaran</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Keterangan</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Jenis Pemasukan/Pengeluaran</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Tanggal</th>
                  <th style={{ backgroundColor: "#28fcb4" }} scope="col">Bukti TF</th>
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
                    <td>{new Date(transaction.tanggal).toLocaleDateString()}</td>
                    <td>
                      {transaction.buktiTransfer && (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleImageClick(`http://localhost:5000/${transaction.buktiTransfer}`)}
                        >
                          Lihat Bukti
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleLogout} className="col-md-12 mb-4 shadow-lg btn btn-danger fs-5">
            Logout
          </button>
        </div>
      </div>

      {/* Modal for displaying the image */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} 
           style={{ display: showModal ? 'block' : 'none' }}
           tabIndex="-1"
           role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bukti Transfer</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Bukti Transfer" 
                  style={{ maxWidth: '100%', height:'500px' }}
                />
              )}
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div 
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
}

export default TransactionTable; 