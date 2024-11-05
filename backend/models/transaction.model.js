module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
      bulan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pemasukan: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      pengeluaran: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      keterangan: {
        type: Sequelize.STRING
      },
      jenis: {
        type: Sequelize.ENUM('Pendapatan Jasa', 'Pendapatan Lain-Lain', 'Beban Operasional', 'Beban Layanan', 'Beban Gaji Karyawan')
      },
      tanggal: {
        type: Sequelize.DATE
      },
      buktiTransfer: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
    return Transaction;
  };