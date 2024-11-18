const db = require("../models");
const Transaction = db.transactions;

exports.create = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { bulan, nama, pemasukan, pengeluaran, keterangan, jenis, tanggal } = req.body;
    const buktiTransfer = req.file ? req.file.filename : null;

    const transaction = await Transaction.create({
      bulan,
      nama,
      pemasukan,
      pengeluaran,
      keterangan,
      jenis,
      tanggal,
      buktiTransfer
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error while creating transaction:", error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving transactions." });
  }
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    
    const summary = {
      totalSaldo: 0,
      totalPemasukan: 0,
      totalPengeluaran: 0,
      pendapatanJasa: 0,
      pendapatanLainLain: 0,
      bebanOperasional: 0,
      bebanLayanan: 0,
      bebanGajiKaryawan: 0
    };

    transactions.forEach(trans => {
      summary.totalPemasukan += Number(trans.pemasukan);
      summary.totalPengeluaran += Number(trans.pengeluaran);
      
      switch(trans.jenis) {
        case 'Pendapatan Jasa':
          summary.pendapatanJasa += Number(trans.pemasukan);
          break;
        case 'Pendapatan Lain-Lain':
          summary.pendapatanLainLain += Number(trans.pemasukan);
          break;
        case 'Beban Operasional':
          summary.bebanOperasional += Number(trans.pengeluaran);
          break;
        case 'Beban Layanan':
          summary.bebanLayanan += Number(trans.pengeluaran);
          break;
        case 'Beban Gaji Karyawan':
          summary.bebanGajiKaryawan += Number(trans.pengeluaran);
          break;
      }
    });

    summary.totalSaldo = summary.totalPemasukan - summary.totalPengeluaran;
    res.json(summary);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error occurred while retrieving dashboard summary."
    });
  }
};