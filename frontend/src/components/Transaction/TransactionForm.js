import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../services/api';
import { Button, Alert } from 'react-bootstrap';
import '../../App.css';

function TransactionForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemovePreview = () => {
    setImagePreview(null);
    setBuktiTransfer(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
  const [imagePreview, setImagePreview] = useState(null);
  // Definisi opsi dengan klasifikasi yang jelas
  const jenisOptions = {
    pendapatan: [
      'Pendapatan Jasa',
      'Pendapatan Lain-Lain'
    ],
    beban: [
      'Beban Operasional',
      'Beban Layanan', 
      'Beban Gaji Karyawan'
    ]
  };

  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Fungsi untuk format angka dengan lebih baik
  const formatCurrency = (number) => {
    return number 
      ? new Intl.NumberFormat('id-ID', { 
          style: 'currency', 
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0 
        }).format(number)
      : '';
  };

  // Fungsi untuk menentukan jenis input yang aktif
  const determineActiveInput = (jenis) => {
    if (jenisOptions.pendapatan.includes(jenis)) {
      return 'pemasukan';
    } else if (jenisOptions.beban.includes(jenis)) {
      return 'pengeluaran';
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'jenis') {
      // Reset input keuangan saat jenis berubah
      setFormData(prev => ({
        ...prev,
        jenis: value,
        pemasukan: 0,
        pengeluaran: 0
      }));
    } else if (name === 'pemasukan' || name === 'pengeluaran') {
      const rawValue = value.replace(/[^\d]/g, '');
      const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);

      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Hanya file gambar (JPEG, PNG, GIF) yang diperbolehkan');
        return;
      }

      // Validasi ukuran file (maks 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB');
        return;
      }

      setBuktiTransfer(file);
      
      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.bulan) return 'Bulan harus diisi';
    if (!formData.nama.trim()) return 'Nama transaksi harus diisi';
    if (!formData.jenis) return 'Jenis transaksi harus dipilih';
    if (!formData.tanggal) return 'Tanggal harus diisi';
    
    const activeInput = determineActiveInput(formData.jenis);
    if (activeInput && formData[activeInput] === 0) {
      return `Masukkan nilai ${activeInput === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}`;
    }
    
    if (!buktiTransfer) return 'Bukti transfer harus diunggah';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Tambah Data Transaksi</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Bulan *</label>
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
            <label className="form-label">Nama Transaksi *</label>
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
            <label className="form-label">Jenis Transaksi *</label>
            <select
              className="form-control"
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Transaksi</option>
              <optgroup label="Pendapatan">
                {jenisOptions.pendapatan.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Beban">
                {jenisOptions.beban.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Pemasukan</label>
              <input
                type="text"
                className="form-control"
                name="pemasukan"
                value={formData.pemasukan > 0 ? formatCurrency(formData.pemasukan) : ''}
                onChange={handleChange}
                placeholder="Rp"
                disabled={determineActiveInput(formData.jenis) !== 'pemasukan'}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Pengeluaran</label>
              <input
                type="text"
                className="form-control"
                name="pengeluaran"
                value={formData.pengeluaran > 0 ? formatCurrency(formData.pengeluaran) : ''}
                onChange={handleChange}
                placeholder="Rp"
                disabled={determineActiveInput(formData.jenis) !== 'pengeluaran'}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Tanggal *</label>
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
            <label className="form-label">Keterangan</label>
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
            <label className="form-label">Bukti Transfer *</label>
            <input
              type="file"
              ref={fileInputRef}
              className="form-control"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/gif"
              required
            />
            {imagePreview && (
              <div className="mt-3 position-relative" style={{ maxWidth: '300px' }}>
                <img 
                  src={imagePreview} 
                  alt="Pratinjau Bukti Transfer" 
                  className="img-fluid rounded shadow"
                />
                <button 
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                  onClick={handleRemovePreview}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            )}
            <small className="form-text text-muted">
              Maks. 5MB (JPEG, PNG, GIF)
            </small>
          </div>

          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              type="button"
              onClick={handleReset} 
              className="me-2"
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;