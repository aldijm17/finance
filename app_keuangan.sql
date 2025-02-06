-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Jan 2025 pada 10.41
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_keuangan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `images`
--

INSERT INTO `images` (`id`, `title`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'kuali', '/uploads/1731657894970.jpeg', '2024-11-15 08:04:55', '2024-11-15 08:04:55'),
(2, 'kuali', '/uploads/1731658037060.jpg', '2024-11-15 08:07:17', '2024-11-15 08:07:17'),
(3, 'kuali', '/uploads/1731658047810.jpg', '2024-11-15 08:07:27', '2024-11-15 08:07:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20241110152510-create-users.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `bulan` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pemasukan` decimal(10,2) DEFAULT 0.00,
  `pengeluaran` decimal(10,2) DEFAULT 0.00,
  `keterangan` varchar(255) DEFAULT NULL,
  `jenis` enum('Pendapatan Jasa','Pendapatan Lain-Lain','Beban Operasional','Beban Layanan','Beban Gaji Karyawan') DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `buktiTransfer` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `bulan`, `nama`, `pemasukan`, `pengeluaran`, `keterangan`, `jenis`, `tanggal`, `buktiTransfer`, `createdAt`, `updatedAt`) VALUES
(1, 'Januari', 'aldi', 121212.00, 0.00, 'adfsfasf', 'Pendapatan Jasa', '2025-01-01 00:00:00', '1734008800720.png', '2024-12-12 13:06:40', '2024-12-12 13:06:40'),
(2, 'Februari', 'qeqwe', 99999999.99, 0.00, 'qweqwe', 'Pendapatan Lain-Lain', '2025-02-01 00:00:00', '1734008855531.png', '2024-12-12 13:07:35', '2024-12-12 13:07:35'),
(3, 'Maret', 'gaji', 0.00, 12212121.00, 'fgfgfg', 'Beban Operasional', '2025-03-03 00:00:00', '1734014811431.png', '2024-12-12 14:47:26', '2024-12-12 14:47:26'),
(4, 'Maret', 'aldi julse', 123123.00, 0.00, 'asad', 'Pendapatan Jasa', '2025-01-02 00:00:00', '1735784631812.jpg', '2025-01-02 02:23:51', '2025-01-02 02:23:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'admin', '$2a$08$gB3JA0OENThsjDUjc134y.WFR/vFYOFv8pC/y44q/NymUHAji52V.', '2024-11-13 12:54:04', '2024-11-13 12:54:04'),
(3, 'admin2', '$2b$10$vsK1Nt5NIL8zCRPmJKZMMOOUbg0r5DZ27K8v1ctTZ9rqoAEu87Gza', '2024-11-14 09:23:05', '2024-11-14 09:23:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
