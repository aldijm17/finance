import React, { useState, useEffect } from "react";
import { transactionService } from "../../services/api";
import DashboardCard from "./DashboardCard";
import "bootstrap/dist/css/bootstrap.min.css";
// import TransactionForm from "../Transaction/TransactionForm";
import TransactionTable from "../Transaction/TransactionTable";


function Dashboard() {
  const [summary, setSummary] = useState({
    totalSaldo: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0,
    pendapatanJasa: 0,
    pendapatanLainLain: 0,
    bebanOperasional: 0,
    bebanLayanan: 0,
    bebanGajiKaryawan: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await transactionService.getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div class="container">
      <h1 class="text-center m-4">Rekap Keuangan</h1>
        <div class="card shadow-lg mb-4 mt-4">
          <div class="card-body">
            <div class="row">
              <h2 class="mb-3">Rekap Pemasukan/Pengeluaran</h2>
              <div class="col-md-6">
                <DashboardCard title="Total Saldo" value={summary.totalSaldo} />
                <DashboardCard
                  title="Total Pemasukan"
                  value={summary.totalPemasukan}
                />
                <DashboardCard
                  title="Total Pengeluaran"
                  value={summary.totalPengeluaran}
                />
                <DashboardCard
                  title="Total Pendapatan Jasa"
                  value={summary.pendapatanJasa}
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
                  title="Total Beban Gaji Karyawan"
                  value={summary.bebanGajiKaryawan}
                  bgColor="bg-red-100"
                />
                {/* Additional summary cards */}
              </div>
            </div>
          </div>
          <TransactionTable/>
        </div>
    </div>
  );
}
export default Dashboard;
