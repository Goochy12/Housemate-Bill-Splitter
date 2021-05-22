CREATE DATABASE  IF NOT EXISTS `goochy13_housemate-bill-splitter` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `goochy13_housemate-bill-splitter`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: goochy13.heliohost.org    Database: goochy13_housemate-bill-splitter
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(225) NOT NULL,
  `value` int(11) NOT NULL,
  `submitted_by_id` int(11) NOT NULL,
  `owing_id` int(11) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `date_submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_paid` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `owed_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (1,'1',10,1,2,1,'0000-00-00 00:00:00','2021-05-15 13:21:19',1),(2,'1',10,1,3,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1),(3,'1',15,1,1,0,'2021-05-12 14:06:19','0000-00-00 00:00:00',2),(10,'1',25,1,2,0,'2021-05-15 12:18:52','0000-00-00 00:00:00',3),(9,'1',20,1,2,0,'2021-05-15 12:17:05','0000-00-00 00:00:00',3),(8,'1',5,1,3,0,'2021-05-15 12:17:04','0000-00-00 00:00:00',2);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-22 18:50:24
