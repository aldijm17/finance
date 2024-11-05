const db = require("../models");
const Transaction = db.transactions;

exports.create = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Error occurred while creating transaction."
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error occurred while retrieving transactions."
    });
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