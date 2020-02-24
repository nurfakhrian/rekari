-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for rekari
DROP DATABASE IF EXISTS `rekari`;
CREATE DATABASE IF NOT EXISTS `rekari` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_cirekarilotpartslotsubparts */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rekari`;

-- Dumping structure for table rekari.lotparts
DROP TABLE IF EXISTS `lotparts`;
CREATE TABLE IF NOT EXISTS `lotparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lotpartBarcode` varchar(18) NOT NULL,
  `total` int NOT NULL,
  `operatorId` int DEFAULT NULL,
  `typePartId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lotpart_barcode` (`lotpartBarcode`),
  KEY `operatorId` (`operatorId`),
  KEY `typePartId` (`typePartId`),
  CONSTRAINT `lotparts_ibfk_1` FOREIGN KEY (`operatorId`) REFERENCES `operators` (`id`) ON DELETE SET NULL,
  CONSTRAINT `lotparts_ibfk_2` FOREIGN KEY (`typePartId`) REFERENCES `typeparts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekari.lotparts: ~6 rows (approximately)
/*!40000 ALTER TABLE `lotparts` DISABLE KEYS */;
REPLACE INTO `lotparts` (`id`, `lotpartBarcode`, `total`, `operatorId`, `typePartId`, `createdAt`, `updatedAt`) VALUES
	(109, 'DYWTR9PICA9TH9C', 36, 6, 3, '2020-02-19 07:05:34', '2020-02-19 07:05:34'),
	(111, 'U34L9YSXD8DNIDC', 25, 6, 11, '2020-02-19 07:35:38', '2020-02-19 07:35:38'),
	(112, 'BMGA7OVLI965OXJ', 40, 6, 6, '2020-02-19 07:50:41', '2020-02-19 07:50:41'),
	(132, '1B9SXS12MQELQL7', 100, 6, 13, '2020-02-19 09:00:42', '2020-02-19 09:00:42'),
	(142, 'W1YI2BCVEGHDGZJ', 500, 3, 13, '2020-02-21 09:47:13', '2020-02-21 09:47:13'),
	(143, 'IAKQHW06ZI81S56', 900, 3, 11, '2020-02-21 09:49:20', '2020-02-21 09:49:20');
/*!40000 ALTER TABLE `lotparts` ENABLE KEYS */;

-- Dumping structure for table rekari.lotpartslotsubparts
DROP TABLE IF EXISTS `lotpartslotsubparts`;
CREATE TABLE IF NOT EXISTS `lotpartslotsubparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lotSubPartCode` varchar(255) NOT NULL,
  `subPartName` varchar(50) NOT NULL,
  `lotPartId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lotPartId` (`lotPartId`),
  CONSTRAINT `lotpartslotsubparts_ibfk_1` FOREIGN KEY (`lotPartId`) REFERENCES `lotparts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekari.lotpartslotsubparts: ~15 rows (approximately)
/*!40000 ALTER TABLE `lotpartslotsubparts` DISABLE KEYS */;
REPLACE INTO `lotpartslotsubparts` (`id`, `lotSubPartCode`, `subPartName`, `lotPartId`, `createdAt`, `updatedAt`) VALUES
	(194, '7-20200217-1B15478-H0000001355871', 'Knocker', 109, '2020-02-19 07:05:35', '2020-02-19 07:05:35'),
	(195, '6-20200217-3B16893-H0000001355873', 'Pin Joint', 109, '2020-02-19 07:05:35', '2020-02-19 07:05:35'),
	(196, '3-20200217-3B17007-H0000001355872', 'Joint', 109, '2020-02-19 07:05:35', '2020-02-19 07:05:35'),
	(197, '13-20200217-3B16910-H0000001355874', 'Washer Pin', 109, '2020-02-19 07:05:35', '2020-02-19 07:05:35'),
	(200, '8-20200217-3B16889-H0000001355900', 'Lever', 111, '2020-02-19 07:35:38', '2020-02-19 07:35:38'),
	(201, '7-20200217-2B13231-H0000001355879', 'Cushion Sheet', 111, '2020-02-19 07:35:38', '2020-02-19 07:35:38'),
	(202, '7-20200217-2B13241-H0000001355875', 'Holder', 112, '2020-02-19 07:50:43', '2020-02-19 07:50:43'),
	(203, '12-20200217-2B13136-H0000001355876', 'Spring Holder', 112, '2020-02-19 07:50:43', '2020-02-19 07:50:43'),
	(204, '10-20200217-3B16898-H0000001355877', 'Pin Stopper', 112, '2020-02-19 07:50:43', '2020-02-19 07:50:43'),
	(243, '6-20200217-2B71346-H0000001355901', 'Pin Pad', 132, '2020-02-19 09:00:42', '2020-02-19 09:00:42'),
	(244, '2-20200217-3B80750-H0000001355946', 'D-Ring', 132, '2020-02-19 09:00:42', '2020-02-19 09:00:42'),
	(267, '10-20200217-3B16898-H0000001355877', 'Pin Pad', 142, '2020-02-21 09:47:13', '2020-02-21 09:47:13'),
	(268, '2-20200217-3B80750-H0000001355946', 'D-Ring', 142, '2020-02-21 09:47:13', '2020-02-21 09:47:13'),
	(269, '10-20200217-3B16898-H0000001355877', 'Lever', 143, '2020-02-21 09:49:20', '2020-02-21 09:49:20'),
	(270, '2-20200217-3B80750-H0000001355946', 'Cushion Sheet', 143, '2020-02-21 09:49:20', '2020-02-21 09:49:20');
/*!40000 ALTER TABLE `lotpartslotsubparts` ENABLE KEYS */;

-- Dumping structure for table rekari.operators
DROP TABLE IF EXISTS `operators`;
CREATE TABLE IF NOT EXISTS `operators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekari.operators: ~12 rows (approximately)
/*!40000 ALTER TABLE `operators` DISABLE KEYS */;
REPLACE INTO `operators` (`id`, `code`, `name`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
	(3, 'SU', 'Super Duper Admin', '$2a$10$kgQQRSFDQa9cihHMphU2pOHuRT1spMFFA6BfUWswAZJpWgWRT7PEm', 'su', '2020-02-07 03:39:31', '2020-02-21 07:50:36'),
	(4, 'ADMIN', 'Administrator', '$2a$10$SllAIlD7i38Rtp5HC1/TsObo9N4HbzIm6Onnhv0Q/VB1jjJb8t0JK', 'admin', '2020-02-07 03:40:32', '2020-02-19 04:01:04'),
	(5, 'AMS9999', 'Dino Fadhil', '$2a$10$uQE8sftgvxp5gKwLbGPJqOmcxrVnTQwFH1PpdgsA6Hn8GQ9.ahH4i', 'operator', '2020-02-07 03:42:37', '2020-02-07 03:42:37'),
	(6, 'AMS0086', 'Hirzi Nurfakhrian', '$2a$10$9ZnpfYdYpnS5YmAHtry1Uu8DICQ54cMPTyBT1d2YwDnmRhOm.pCua', 'operator', '2020-02-10 07:16:41', '2020-02-11 05:41:19'),
	(8, 'AMS0070', 'Diva Vebrian', '$2a$10$bL7/ZgZof5OJjsHYLAfQYOuJEH2DxPcEcqt25JgBbU.73sf9keZvK', 'operator', '2020-02-10 07:19:01', '2020-02-10 07:19:01'),
	(10, 'AMS0001', 'Brendand Pratama Nusa', '$2a$10$pIgaU0UlfU2DHaBVcnycJON3WXgXUN2QgZdFbqpZq6WfUFddCq4MK', 'operator', '2020-02-10 07:54:20', '2020-02-11 02:09:03'),
	(11, 'AMS0002', 'Korigor Hasyim', '$2a$10$O5.8ze8AOtP5Kwdl/ijZ4.9PO7tjbe4AIEFxdg0sv1B1b1NGq5ZKy', 'operator', '2020-02-10 07:54:42', '2020-02-10 07:54:42'),
	(12, 'AMS0045', 'Edward Coolant', '$2a$10$NauFtVJNiZ594OTNGhjeX.zuEYiMwJsZGMBtlp6RouovvpES4loAG', 'operator', '2020-02-10 07:55:15', '2020-02-10 07:55:15'),
	(14, 'AMS1001', 'Hilal Brunei', '$2a$10$vBM2qwdhEPmNJWNeVH3DA.MadDgr0PKm2zhtHXRTRqQbdSCCIqBNu', 'operator', '2020-02-11 04:47:06', '2020-02-11 04:47:06'),
	(16, 'AMS1003', 'Jaka Frando', '$2a$10$veF8hQsk.NkYt6fY84qn7u08wizUpHdCmJtTitleqntRzhw9gVsk.', 'operator', '2020-02-11 04:51:13', '2020-02-11 04:51:13'),
	(17, 'AMS1004', 'Narni Atenda', '$2a$10$aDsZcwpectOWBZilE6oY7.uLRZqx4uhAQSEEqMg9fBiZ.LMOauEoC', 'operator', '2020-02-11 04:52:09', '2020-02-11 04:52:09'),
	(20, 'AMS6666', 'Chikuso Omae', '$2a$10$vrKUARsk3b26Ixm7mAJhO.aL20BpY5HwbjBegHPiaZ4XaDG378Z0O', 'operator', '2020-02-12 01:48:45', '2020-02-12 01:48:45'),
	(21, 'AMS0027', 'Aldian Mewah', '$2a$10$7TFJA9unmgfMFR8SkmLSRuYvRiGboc2CfCz6JGtRKCZr9V/h6EkBu', 'operator', '2020-02-21 09:32:23', '2020-02-21 09:32:23');
/*!40000 ALTER TABLE `operators` ENABLE KEYS */;

-- Dumping structure for table rekari.sequelizemeta
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table rekari.sequelizemeta: ~5 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
REPLACE INTO `sequelizemeta` (`name`) VALUES
	('20200202123012-create-operator.js'),
	('20200203093915-create-type-part.js'),
	('20200204005103-create-lot-part.js'),
	('20200204005853-create-sub-part-detail.js'),
	('20200204010723-create-lot-parts-lot-sub-parts.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table rekari.subpartdetails
DROP TABLE IF EXISTS `subpartdetails`;
CREATE TABLE IF NOT EXISTS `subpartdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `typePartId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typePartId` (`typePartId`),
  CONSTRAINT `subpartdetails_ibfk_1` FOREIGN KEY (`typePartId`) REFERENCES `typeparts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekari.subpartdetails: ~11 rows (approximately)
/*!40000 ALTER TABLE `subpartdetails` DISABLE KEYS */;
REPLACE INTO `subpartdetails` (`id`, `name`, `typePartId`, `createdAt`, `updatedAt`) VALUES
	(9, 'Knocker', 3, '2020-02-13 07:58:47', '2020-02-17 08:36:30'),
	(10, 'Pin Joint', 3, '2020-02-13 07:58:47', '2020-02-17 08:36:30'),
	(11, 'Joint', 3, '2020-02-13 07:58:47', '2020-02-17 08:36:30'),
	(15, 'Holder', 6, '2020-02-13 08:59:45', '2020-02-17 09:17:23'),
	(16, 'Spring Holder', 6, '2020-02-13 08:59:45', '2020-02-17 09:17:23'),
	(21, 'Lever', 11, '2020-02-14 00:42:25', '2020-02-17 08:39:15'),
	(22, 'Cushion Sheet', 11, '2020-02-14 00:42:25', '2020-02-17 08:39:15'),
	(35, 'Washer Pin', 3, '2020-02-14 04:43:47', '2020-02-17 08:36:30'),
	(36, 'Pin Stopper', 6, '2020-02-14 04:44:01', '2020-02-17 09:17:23'),
	(48, 'Pin Pad', 13, '2020-02-14 05:48:12', '2020-02-17 08:39:43'),
	(49, 'D-Ring', 13, '2020-02-14 05:48:12', '2020-02-17 08:39:43');
/*!40000 ALTER TABLE `subpartdetails` ENABLE KEYS */;

-- Dumping structure for table rekari.typeparts
DROP TABLE IF EXISTS `typeparts`;
CREATE TABLE IF NOT EXISTS `typeparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `section` varchar(100) NOT NULL,
  `nSubPart` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekari.typeparts: ~4 rows (approximately)
/*!40000 ALTER TABLE `typeparts` DISABLE KEYS */;
REPLACE INTO `typeparts` (`id`, `name`, `section`, `nSubPart`, `createdAt`, `updatedAt`) VALUES
	(3, 'Knocker Assembly', 'master', 4, '2020-02-13 07:58:47', '2020-02-17 08:36:30'),
	(6, 'Holder Assembly', 'master', 3, '2020-02-13 08:59:45', '2020-02-17 09:17:23'),
	(11, 'Lever Sub Assy', 'master', 2, '2020-02-14 00:42:25', '2020-02-17 08:39:15'),
	(13, 'D-Ring Pin Pad', 'caliper', 2, '2020-02-14 05:48:12', '2020-02-17 08:39:43');
/*!40000 ALTER TABLE `typeparts` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
