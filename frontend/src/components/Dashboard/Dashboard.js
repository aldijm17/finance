import React, { useState, useEffect } from 'react';
import { transactionService } from '../../services/api';
import DashboardCard from './DashboardCard';
import 'bootstrap/dist/css/bootstrap.min.css';


function Dashboard() {
  const [summary, setSummary] = useState({
    totalSaldo: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0,
    pendapatanJasa: 0,
    pendapatanLainLain: 0,
    bebanOperasional: 0,
    bebanLayanan: 0,
    bebanGajiKaryawan: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await transactionService.getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div class="row">
      <h1 class="text-center mt-5 mb-3">Keuangan</h1>
      <div class="col-md-6">
        <DashboardCard 
          title="Total Saldo"
          value={summary.totalSaldo}
          bgColor="bg-blue-100"
        />
        <DashboardCard 
          title="Total Pemasukan"
          value={summary.totalPemasukan}
          bgColor="bg-green-100"
        />
        <DashboardCard 
          title="Total Pengeluaran"
          value={summary.totalPengeluaran}
          bgColor="bg-red-100"
        />
        <DashboardCard 
          title="Total Pendapatan Jasa"
          value={summary.pendapatanJasa}
          bgColor="bg-red-100"
        />

        </div>
        <div class="col-md-6">
        <DashboardCard 
          title="Total Pendapatan Lain Lain"
          value={summary.pendapatanLainLain}
          bgColor="bg-red-100"
        />
        <DashboardCard 
          title="Total Beban Operasional"
          value={summary.bebanOperasional}
          bgColor="bg-red-100"
        />
        <DashboardCard 
          title="Total Beban Layanan"
          value={summary.bebanLayanan}
          bgColor="bg-red-100"
        />
        <DashboardCard 
          title="Total Beban Operasional" value={summary.bebanGajiKaryawan} bgColor="bg-red-100"
        />
        {/* Additional summary cards */}
      </div>
    </div>
  );
}
export default Dashboard;