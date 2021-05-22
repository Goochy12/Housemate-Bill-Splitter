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
-- Temporary view structure for view `owing_detailed`
--

DROP TABLE IF EXISTS `owing_detailed`;
/*!50001 DROP VIEW IF EXISTS `owing_detailed`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `owing_detailed` AS SELECT 
 1 AS `ID`,
 1 AS `ID_TO`,
 1 AS `To`,
 1 AS `Item Name`,
 1 AS `Amount`,
 1 AS `Paid`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `owed_summary`
--

DROP TABLE IF EXISTS `owed_summary`;
/*!50001 DROP VIEW IF EXISTS `owed_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `owed_summary` AS SELECT 
 1 AS `ID`,
 1 AS `Amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `owing_summary`
--

DROP TABLE IF EXISTS `owing_summary`;
/*!50001 DROP VIEW IF EXISTS `owing_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `owing_summary` AS SELECT 
 1 AS `ID`,
 1 AS `Amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `all_unpaid_records`
--

DROP TABLE IF EXISTS `all_unpaid_records`;
/*!50001 DROP VIEW IF EXISTS `all_unpaid_records`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `all_unpaid_records` AS SELECT 
 1 AS `To`,
 1 AS `From`,
 1 AS `Item Name`,
 1 AS `Amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `owed_detailed`
--

DROP TABLE IF EXISTS `owed_detailed`;
/*!50001 DROP VIEW IF EXISTS `owed_detailed`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `owed_detailed` AS SELECT 
 1 AS `ID`,
 1 AS `ID_FROM`,
 1 AS `From`,
 1 AS `Item Name`,
 1 AS `Amount`,
 1 AS `Paid`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `owing_detailed`
--

/*!50001 DROP VIEW IF EXISTS `owing_detailed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`goochy13`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `owing_detailed` AS select `r`.`owing_id` AS `ID`,`r`.`owed_id` AS `ID_TO`,`u`.`display_name` AS `To`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount`,`r`.`paid` AS `Paid` from (`record` `r` join `user` `u` on((`r`.`owed_id` = `u`.`id`))) where (`r`.`paid` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `owed_summary`
--

/*!50001 DROP VIEW IF EXISTS `owed_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`goochy13`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `owed_summary` AS select `r`.`owed_id` AS `ID`,sum(`r`.`value`) AS `Amount` from `record` `r` where (`r`.`paid` = 0) group by `r`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `owing_summary`
--

/*!50001 DROP VIEW IF EXISTS `owing_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`goochy13`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `owing_summary` AS select `r`.`owing_id` AS `ID`,sum(`r`.`value`) AS `Amount` from `record` `r` where (`r`.`paid` = 0) group by `r`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_unpaid_records`
--

/*!50001 DROP VIEW IF EXISTS `all_unpaid_records`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`goochy13`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `all_unpaid_records` AS select `u2`.`display_name` AS `To`,`u1`.`display_name` AS `From`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount` from ((`record` `r` join `user` `u1` on((`r`.`owing_id` = `u1`.`id`))) join `user` `u2` on((`r`.`owed_id` = `u2`.`id`))) where (`r`.`paid` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `owed_detailed`
--

/*!50001 DROP VIEW IF EXISTS `owed_detailed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`goochy13`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `owed_detailed` AS select `r`.`owed_id` AS `ID`,`r`.`owing_id` AS `ID_FROM`,`u`.`display_name` AS `From`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount`,`r`.`paid` AS `Paid` from (`record` `r` join `user` `u` on((`r`.`owing_id` = `u`.`id`))) where (`r`.`paid` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-22 18:50:55
