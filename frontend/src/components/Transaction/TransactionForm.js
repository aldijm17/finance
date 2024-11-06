import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../services/api';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

function TransactionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    bulan: '',
    nama: '',
    pemasukan: 0,
    pengeluaran: 0,
    keterangan: '',
    jenis: '',
    tanggal: '',
    buktiTransfer: ''
  });

  const jenisOptions = [
    'Pendapatan Jasa',
    'Pendapatan Lain-Lain',
    'Beban Operasional',
    'Beban Layanan',
    'Beban Gaji Karyawan'
  ];
  const bulanOptions = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'pemasukan' || name === 'pengeluaran') {
      const numValue = value === '' ? 0 : parseFloat(value);
      if (isNaN(numValue)) return;
      
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
        [name === 'pemasukan' ? 'pengeluaran' : 'pemasukan']: 0
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.bulan) return 'Bulan harus diisi';
    if (!formData.nama) return 'Nama transaksi harus diisi';
    if (!formData.jenis) return 'Jenis transaksi harus dipilih';
    if (!formData.tanggal) return 'Tanggal harus diisi';
    if (formData.pemasukan === 0 && formData.pengeluaran === 0) {
      return 'Masukkan nilai pemasukan atau pengeluaran';
    }
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

    try {
      setLoading(true);
      await transactionService.createTransaction(formData);
      navigate('/');
    } catch (err) {
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
      tanggal: '',
      buktiTransfer: ''
    });
    setError('');
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-4">Tambah Transaksi Baru</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBulan" className="mb-3">
            <Form.Label>Bulan *</Form.Label>
            <Form.Control
              as="select"
              name="bulan"
              value={formData.bulan}
              onChange={handleChange}
              required
            >
            <option value="">Bulan</option>
              {bulanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formNama" className="mb-3">
            <Form.Label>Nama Transaksi *</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: DP Proyek Website"
              required
            />
          </Form.Group>

          <Form.Group controlId="formJenis" className="mb-3">
            <Form.Label>Jenis Transaksi *</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formPemasukan">
                <Form.Label>Pemasukan</Form.Label>
                <Form.Control
                  type="number"
                  name="pemasukan"
                  value={formData.pemasukan}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Rp"
                  disabled={formData.pengeluaran > 0}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPengeluaran">
                <Form.Label>Pengeluaran</Form.Label>
                <Form.Control
                  type="number"
                  name="pengeluaran"
                  value={formData.pengeluaran}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Rp"
                  disabled={formData.pemasukan > 0}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formTanggal" className="mb-3">
            <Form.Label>Tanggal *</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formKeterangan" className="mb-3">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows={3}
              placeholder="Tambahkan keterangan transaksi (opsional)"
            />
          </Form.Group>

          <Form.Group controlId="formBuktiTransfer" className="mb-3">
            <Form.Label>Bukti Transfer</Form.Label>
            <Form.Control
              type="text"
              name="buktiTransfer"
              value={formData.buktiTransfer}
              onChange={handleChange}
              placeholder="Link atau nomor referensi bukti transfer"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleReset} className="me-2">
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
        </Form>
      </Card>
    </Container>
  );
}

export default TransactionForm;
