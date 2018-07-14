# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.16-log)
# Database: hackathon
# Generation Time: 2018-07-14 12:54:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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



# Dump of table Order_Table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Order_Table`;

CREATE TABLE `Order_Table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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
