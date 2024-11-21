import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../services/api';
import { Button, Alert } from 'react-bootstrap';
import '../../App.js';

function TransactionForm() {
  const navigate = useNavigate();
  const goToTransactionForm = () => {
    navigate('/'); // Navigates to the TransactionForm page
    window.location.reload();
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    bulan: '',
    nama: '',
    pemasukan: 0,
    pengeluaran: 0,
    keterangan: '',
    jenis: '',
    tanggal: ''
  });
  const [buktiTransfer, setBuktiTransfer] = useState(null);

  const jenisOptions = [
    'Pendapatan Jasa',
    'Pendapatan Lain-Lain',
    'Beban Operasional',
    'Beban Layanan',
    'Beban Gaji Karyawan'
  ];
  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Fungsi untuk format angka
  const formatCurrency = (number) => {
    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pemasukan' || name === 'pengeluaran') {
      const rawValue = value.replace(/\./g, '').replace('Rp ', ''); // Menghapus format sebelumnya
      const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
      if (isNaN(numValue)) return;

      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
        [name === 'pemasukan' ? 'pengeluaran' : 'pemasukan']: 0 // Reset field lain
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setBuktiTransfer(e.target.files[0]);
  };

  // Fungsi validasi form
  const validateForm = () => {
    if (!formData.bulan) return 'Bulan harus diisi';
    if (!formData.nama.trim()) return 'Nama transaksi harus diisi';
    if (!formData.jenis) return 'Jenis transaksi harus dipilih';
    if (!formData.tanggal) return 'Tanggal harus diisi';
    if (formData.pemasukan === 0 && formData.pengeluaran === 0) {
      return 'Masukkan nilai pemasukan atau pengeluaran';
    }
    if (!buktiTransfer) return 'Bukti transfer harus diunggah';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi sebelum submit
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (buktiTransfer) data.append("buktiTransfer", buktiTransfer);

    try {
      setLoading(true);
      await transactionService.createTransaction(data);
      navigate('/');
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan transaksi');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      bulan: '',
      nama: '',
      pemasukan: 0,
      pengeluaran: 0,
      keterangan: '',
      jenis: '',
      tanggal: ''
    });
    setBuktiTransfer(null);
    setError('');
  };

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="">
          <button onClick={goToTransactionForm} className="tombol btn btn-danger col-md-12 fs-5 shadow-lg">
            Kembali
          </button>
        </div>
      </div>
      <div className="card p-4 shadow-sm fs-5">
        <h2 className="text-center mb-4">Tambah Data Baru</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Bulan *</label>
            <select
              className="form-control"
              name="bulan"
              value={formData.bulan}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Bulan</option>
              {bulanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Nama Transaksi *</label>
            <input
              type="text"
              className="form-control"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: DP Proyek Website"
              required
            />
          </div>

          <div className="mb-3">
            <label>Jenis Transaksi *</label>
            <select
              className="form-control"
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Transaksi</option>
              {jenisOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Pemasukan</label>
              <input
                type="text"
                className="form-control"
                name="pemasukan"
                value={formData.pemasukan > 0 ? `Rp ${formatCurrency(formData.pemasukan)}` : ''}
                onChange={handleChange}
                placeholder="Rp"
                disabled={formData.pengeluaran > 0}
              />
            </div>
            <div className="col-md-6">
              <label>Pengeluaran</label>
              <input
                type="text"
                className="form-control"
                name="pengeluaran"
                value={formData.pengeluaran > 0 ? `Rp ${formatCurrency(formData.pengeluaran)}` : ''}
                onChange={handleChange}
                placeholder="Rp"
                disabled={formData.pemasukan > 0}
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Tanggal *</label>
            <input
              type="date"
              className="form-control"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Keterangan</label>
            <textarea
              className="form-control"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows="3"
              placeholder="Tambahkan keterangan transaksi (opsional)"
            />
          </div>
          <div className="mb-3">
            <label>Bukti Transfer *</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleReset} className="me-2">
              Reset
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
