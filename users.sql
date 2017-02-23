-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2017 at 11:02 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `isAdmin`) VALUES
('loveferoz', 'feroz', 1),
('malli', 'feroz01', NULL),
('chiru', 'bang', NULL),
('selva', 'selva', NULL),
('kalai', 'kalai', NULL),
('feroz', 'feroz', 1),
('12345', 'feroz', NULL),
('feroz01', 'feroz', 0),
('feroz09', 'feroz', 0),
('feroz02', 'feroz', 0),
('malli01', 'malli', 0),
('feroz03', 'Feroz', 0),
('feroz04', 'feroz', 0),
('mani54', 'mani', 0),
('mani01', 'mani', 0),
('feroz05', 'feroz', 0),
('chiru01', 'chiru', 0),
('feroz06', 'feroz', 0),
('feroz07', 'feroz', 0),
('chiru02', 'chiru', 0),
('chiru03', 'chiru', 0),
('chiru04', 'chiru', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
