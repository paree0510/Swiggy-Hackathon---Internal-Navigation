# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.16-log)
# Database: hackathon
# Generation Time: 2018-07-15 07:08:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Apartment_Blocks_Map
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Apartment_Blocks_Map`;

CREATE TABLE `Apartment_Blocks_Map` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `apartment_id` varchar(25) NOT NULL DEFAULT '',
  `block_id` varchar(25) NOT NULL DEFAULT '',
  `block_lat_long` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apartment_id` (`apartment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Apartment_Blocks_Map` WRITE;
/*!40000 ALTER TABLE `Apartment_Blocks_Map` DISABLE KEYS */;

INSERT INTO `Apartment_Blocks_Map` (`id`, `apartment_id`, `block_id`, `block_lat_long`)
VALUES
	(1,'ozone_evergreens','ozone_evergreens_A','12.909368, 77.662744'),
	(2,'ozone_evergreens','ozone_evergreens_B','12.909335, 77.663102'),
	(3,'prestige_apartment','prestige_apartment_H','13.063662,77.743355'),
	(4,'ozone_evergreens','ozone_evergreens_C','12.909101, 77.663239'),
	(5,'ozone_evergreens','ozone_evergreens_D','12.908756, 77.663276'),
	(6,'ozone_evergreens','ozone_evergreens_E','12.908572, 77.663176'),
	(7,'ozone_evergreens','ozone_evergreens_F','12.908447, 77.662853'),
	(8,'ozone_evergreens','ozone_evergreens_G','12.908497, 77.662630'),
	(9,'ozone_evergreens','ozone_evergreens_H','12.908592, 77.662347');

/*!40000 ALTER TABLE `Apartment_Blocks_Map` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Entrance_Table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Entrance_Table`;

CREATE TABLE `Entrance_Table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `apartment_id` text NOT NULL,
  `entrance_id` text NOT NULL,
  `lat_long` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Entrance_Table` WRITE;
/*!40000 ALTER TABLE `Entrance_Table` DISABLE KEYS */;

INSERT INTO `Entrance_Table` (`id`, `apartment_id`, `entrance_id`, `lat_long`)
VALUES
	(1,'ozone_evergreens','ozone_evergreens_1','12.909268, 77.663407'),
	(2,'ozone_evergreens','ozone_evergreens_2','12.908480, 77.663372'),
	(3,'prestige_apartment','prestige_apartment_1','13.063417, 77.742868');

/*!40000 ALTER TABLE `Entrance_Table` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Order_Table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Order_Table`;

CREATE TABLE `Order_Table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Order_Table` WRITE;
/*!40000 ALTER TABLE `Order_Table` DISABLE KEYS */;

INSERT INTO `Order_Table` (`id`, `order_id`, `address`)
VALUES
	(1,1,'A007, Ozone Evergreens'),
	(2,2,'B007, Ozone Evergreens'),
	(3,3,'H124, Prestige Apartment, Bangalore');

/*!40000 ALTER TABLE `Order_Table` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Table1
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Table1`;

CREATE TABLE `Table1` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dest_id` varchar(25) NOT NULL DEFAULT '',
  `entrance_id` varchar(25) NOT NULL DEFAULT '',
  `lat_longs` blob,
  PRIMARY KEY (`id`),
  KEY `dest_id` (`dest_id`,`entrance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Table1` WRITE;
/*!40000 ALTER TABLE `Table1` DISABLE KEYS */;

INSERT INTO `Table1` (`id`, `dest_id`, `entrance_id`, `lat_longs`)
VALUES
	(1,'ozone_evergreens_A','ozone_evergreens_1',X'5B5B31322E3930393236352C2037372E3636333431345D2C5B31322E3930393331342C2037372E3636333335325D2C5B31322E3930393336382C2037372E3636333332335D2C5B31322E3930393433352C2037372E3636333236305D2C5B31322E3930393436372C2037372E3636333137325D2C5B31322E3930393439322C2037372E3636333037315D2C5B31322E3930393439382C2037372E3636323938365D2C5B31322E3930393533312C2037372E3636323838325D2C5B31322E3930393535352C2037372E3636323739375D2C5B31322E3930393537352C2037372E3636323732335D2C5B31322E3930393538332C2037372E3636323634395D2C5B31322E3930393539312C2037372E3636323539335D2C5B31322E3930393535372C2037372E3636323534305D2C5B31322E3930393530382C2037372E3636323533325D2C5B31322E3930393436392C2037372E3636323532315D2C5B31322E3930393432382C2037372E3636323530385D2C5B31322E3930393338392C2037372E3636323530305D2C5B31322E3930393334322C2037372E3636323439355D2C5B31322E3930393333342C2037372E3636323535305D2C5B31322E3930393334322C2037372E3636323539335D2C5B31322E3930393335382C2037372E3636323633335D2C5B31322E3930393336382C2037372E3636323637305D2C5B31322E3930393337312C2037372E3636323731305D2C5B31322E3930393336382C2037372E3636323734345D5D'),
	(2,'ozone_evergreens_B','ozone_evergreens_2',X'5B5B31322E3930383437382C2037372E3636333338365D2C5B31322E3930383336382C2037372E3636333238305D2C5B31322E3930383234352C2037372E3636333131325D2C5B31322E3930383136352C2037372E3636323836315D2C5B31322E3930383139332C2037372E3636323538385D2C5B31322E3930383239322C2037372E3636323333325D2C5B31322E3930383433302C2037372E3636323138325D2C5B31322E3930383633312C2037372E3636323035365D2C5B31322E3930383830332C2037372E3636323033305D2C5B31322E3930383835322C2037372E3636323231395D2C5B31322E3930383837332C2037372E3636323336365D2C5B31322E3930383932302C2037372E3636323434365D2C5B31322E3930383834372C2037372E3636323532375D2C5B31322E3930383737372C2037372E3636323630315D2C5B31322E3930383638382C2037372E3636323639325D2C5B31322E3930383630302C2037372E3636323736325D2C5B31322E3930383532392C2037372E3636323730305D2C5B31322E3930383438322C2037372E3636323634395D5D'),
	(11,'prestige_apartment_H','prestige_apartment_1',X'5B5B31332E3036333431372C37372E3734323836345D2C5B31332E3036333336352C37372E3734323937385D2C5B31332E3036333336352C37372E3734333038355D2C5B31332E3036333336322C37372E3734333230355D2C5B31332E3036333339362C37372E3734333332325D2C5B31332E3036333439352C37372E3734333339375D2C5B31332E3036333633312C37372E3734333435375D2C5B31332E3036333636322C37372E3734333335355D5D');

/*!40000 ALTER TABLE `Table1` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Table2
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Table2`;

CREATE TABLE `Table2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dest_id` varchar(25) NOT NULL DEFAULT '',
  `entrance_id` varchar(25) NOT NULL DEFAULT '',
  `lat_longs` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
