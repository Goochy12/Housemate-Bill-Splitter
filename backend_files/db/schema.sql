DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`authentication` ;

CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`authentication` (
  `id` INT NOT NULL,
  `username` LONGTEXT NOT NULL,
  `password` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `goochy13_housemate-bill-splitter`.`group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`group` ;

CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `goochy13_housemate-bill-splitter`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`item` ;

CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `goochy13_housemate-bill-splitter`.`record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`record` ;

CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`record` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(225) NOT NULL,
  `value` INT NOT NULL,
  `submitted_by_id` INT NOT NULL,
  `owing_id` INT NOT NULL,
  `paid` TINYINT(1) NOT NULL DEFAULT '0',
  `date_submitted` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_paid` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  `owed_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `goochy13_housemate-bill-splitter`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`user` ;

CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` LONGTEXT NOT NULL,
  `surname` LONGTEXT NOT NULL,
  `group_id` INT NOT NULL,
  `display_name` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;

USE `goochy13_housemate-bill-splitter` ;

-- -----------------------------------------------------
-- Placeholder table for view `goochy13_housemate-bill-splitter`.`all_unpaid_records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`all_unpaid_records` (`record_id` INT, `group_id` INT, `To` INT, `From` INT, `Item Name` INT, `Amount` INT);

-- -----------------------------------------------------
-- Placeholder table for view `goochy13_housemate-bill-splitter`.`owed_detailed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`owed_detailed` (`record_id` INT, `group_id` INT, `to_id` INT, `from_id` INT, `From` INT, `Item Name` INT, `Amount` INT, `Paid` INT);

-- -----------------------------------------------------
-- Placeholder table for view `goochy13_housemate-bill-splitter`.`owed_summary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`owed_summary` (`to_id` INT, `group_id` INT, `Amount` INT);

-- -----------------------------------------------------
-- Placeholder table for view `goochy13_housemate-bill-splitter`.`owing_detailed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`owing_detailed` (`record_id` INT, `group_id` INT, `from_id` INT, `to_id` INT, `To` INT, `Item Name` INT, `Amount` INT, `Paid` INT);

-- -----------------------------------------------------
-- Placeholder table for view `goochy13_housemate-bill-splitter`.`owing_summary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goochy13_housemate-bill-splitter`.`owing_summary` (`from_id` INT, `group_id` INT, `Amount` INT);

-- -----------------------------------------------------
-- View `goochy13_housemate-bill-splitter`.`all_unpaid_records`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`all_unpaid_records`;
DROP VIEW IF EXISTS `goochy13_housemate-bill-splitter`.`all_unpaid_records` ;
USE `goochy13_housemate-bill-splitter`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `goochy13_housemate-bill-splitter`.`all_unpaid_records` AS select `r`.`id` AS `record_id`,`r`.`group_id` AS `group_id`,`u2`.`display_name` AS `To`,`u1`.`display_name` AS `From`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount` from ((`goochy13_housemate-bill-splitter`.`record` `r` join `goochy13_housemate-bill-splitter`.`user` `u1` on((`r`.`owing_id` = `u1`.`id`))) join `goochy13_housemate-bill-splitter`.`user` `u2` on((`r`.`owed_id` = `u2`.`id`))) where (`r`.`paid` = 0);

-- -----------------------------------------------------
-- View `goochy13_housemate-bill-splitter`.`owed_detailed`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`owed_detailed`;
DROP VIEW IF EXISTS `goochy13_housemate-bill-splitter`.`owed_detailed` ;
USE `goochy13_housemate-bill-splitter`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `goochy13_housemate-bill-splitter`.`owed_detailed` AS select `r`.`id` AS `record_id`,`r`.`group_id` AS `group_id`,`r`.`owed_id` AS `to_id`,`r`.`owing_id` AS `from_id`,`u`.`display_name` AS `From`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount`,`r`.`paid` AS `Paid` from (`goochy13_housemate-bill-splitter`.`record` `r` join `goochy13_housemate-bill-splitter`.`user` `u` on((`r`.`owing_id` = `u`.`id`))) where (`r`.`paid` = 0);

-- -----------------------------------------------------
-- View `goochy13_housemate-bill-splitter`.`owed_summary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`owed_summary`;
DROP VIEW IF EXISTS `goochy13_housemate-bill-splitter`.`owed_summary` ;
USE `goochy13_housemate-bill-splitter`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `goochy13_housemate-bill-splitter`.`owed_summary` AS select `r`.`owed_id` AS `to_id`,`r`.`group_id` AS `group_id`,sum(`r`.`value`) AS `Amount` from `goochy13_housemate-bill-splitter`.`record` `r` where (`r`.`paid` = 0) group by `r`.`owed_id`;

-- -----------------------------------------------------
-- View `goochy13_housemate-bill-splitter`.`owing_detailed`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`owing_detailed`;
DROP VIEW IF EXISTS `goochy13_housemate-bill-splitter`.`owing_detailed` ;
USE `goochy13_housemate-bill-splitter`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `goochy13_housemate-bill-splitter`.`owing_detailed` AS select `r`.`id` AS `record_id`,`r`.`group_id` AS `group_id`,`r`.`owing_id` AS `from_id`,`r`.`owed_id` AS `to_id`,`u`.`display_name` AS `To`,`r`.`item` AS `Item Name`,`r`.`value` AS `Amount`,`r`.`paid` AS `Paid` from (`goochy13_housemate-bill-splitter`.`record` `r` join `goochy13_housemate-bill-splitter`.`user` `u` on((`r`.`owed_id` = `u`.`id`))) where (`r`.`paid` = 0);

-- -----------------------------------------------------
-- View `goochy13_housemate-bill-splitter`.`owing_summary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goochy13_housemate-bill-splitter`.`owing_summary`;
DROP VIEW IF EXISTS `goochy13_housemate-bill-splitter`.`owing_summary` ;
USE `goochy13_housemate-bill-splitter`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `goochy13_housemate-bill-splitter`.`owing_summary` AS select `r`.`owing_id` AS `from_id`,`r`.`group_id` AS `group_id`,sum(`r`.`value`) AS `Amount` from `goochy13_housemate-bill-splitter`.`record` `r` where (`r`.`paid` = 0) group by `r`.`owing_id`;
