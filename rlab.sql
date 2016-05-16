SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`course` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`course` (
  `id` VARCHAR(32) NOT NULL ,
  `code` VARCHAR(45) NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `year` INT NOT NULL ,
  `season` VARCHAR(45) NOT NULL ,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`user` (
  `id` VARCHAR(32) NOT NULL ,
  `username` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(128) NULL ,
  `enabled` TINYINT(1)  NULL ,
  `user_role` VARCHAR(45) NULL ,
  `school_no` VARCHAR(45) NULL ,
  `name` VARCHAR(45) NULL ,
  `clazz_name` VARCHAR(45) NULL ,
  `email` VARCHAR(45) NULL ,
  `phone` VARCHAR(45) NULL ,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `last_login_time` DATETIME NULL ,
  `last_login_ip` VARCHAR(45) NULL ,
  `login_count` INT NULL ,
  `online_time` BIGINT(20)  NULL ,
  `current_course_id` VARCHAR(32) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_user_course1` (`current_course_id` ASC) ,
  CONSTRAINT `fk_user_course1`
    FOREIGN KEY (`current_course_id` )
    REFERENCES `mydb`.`course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`experiment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`experiment` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`experiment` (
  `id` VARCHAR(32) NOT NULL ,
  `course_id` VARCHAR(32) NOT NULL ,
  `user_id` VARCHAR(32) NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `op_time` BIGINT(20)  NULL ,
  `op_times` INT NULL ,
  `submit_times` INT NULL ,
  `last_submit_path` VARCHAR(255) NULL ,
  `done` TINYINT(1)  NULL ,
  `done_time` DATETIME NULL ,
  `src_path` VARCHAR(255) NULL ,
  `grade` INT NULL ,
  `remark` VARCHAR(255) NULL ,
  `remark_user_id` VARCHAR(32) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_experiment_user1` (`user_id` ASC) ,
  INDEX `fk_experiment_user2` (`remark_user_id` ASC) ,
  INDEX `fk_experiment_course1` (`course_id` ASC) ,
  CONSTRAINT `fk_experiment_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experiment_user2`
    FOREIGN KEY (`remark_user_id` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experiment_course1`
    FOREIGN KEY (`course_id` )
    REFERENCES `mydb`.`course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`course_has_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`course_has_user` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`course_has_user` (
  `course_id` VARCHAR(32) NOT NULL ,
  `user_id` VARCHAR(32) NOT NULL ,
  PRIMARY KEY (`course_id`, `user_id`) ,
  INDEX `fk_course_has_user_user1` (`user_id` ASC) ,
  INDEX `fk_course_has_user_course1` (`course_id` ASC) ,
  CONSTRAINT `fk_course_has_user_course1`
    FOREIGN KEY (`course_id` )
    REFERENCES `mydb`.`course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_user_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cpu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`cpu` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`cpu` (
  `id` VARCHAR(32) NOT NULL ,
  `user_id` VARCHAR(32) NOT NULL ,
  `experiment_name` VARCHAR(45) NULL ,
  `variables` VARCHAR(2048) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_cpu_user1` (`user_id` ASC) ,
  CONSTRAINT `fk_cpu_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
