CREATE SCHEMA `app_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;

CREATE TABLE `app_test`.`users` (
  `id` 				    VARCHAR(50)  NOT NULL,
  `username` 		  VARCHAR(50) NOT NULL,
  `password` 		  VARCHAR(255) NOT NULL,
  `name` 			    VARCHAR(255) NOT NULL,
  `date_ob` 		  datetime NULL,
  `gen` 			    VARCHAR(10) NULL,
  `created_date` 	datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `role_name` 		VARCHAR(50) DEFAULT 'REGISTER' NULL,
PRIMARY KEY (`id`));

CREATE TABLE `app_test`.`token` (
  `id` 			    VARCHAR(50)  NOT NULL,
  `user_id` 		VARCHAR(50) NOT NULL,
  `token` 			LONGTEXT NOT NULL,
PRIMARY KEY (`id`));

  
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('j123456879','quanly1','123456','Nguyễn Tuấn A', '1991-10-14', 'M', '2022-03-21', 'MANAGER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('b123456879','quanly2','123456','Nguyễn Văn B', '1992-10-15', 'F', '2022-03-22', 'MANAGER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('c123456879','nguoidung1','123456','Trần Văn C', '1993-10-16', 'M', '2022-03-23', 'REGISTER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('d123456879','nguoidung2','123456','Lê Văn E', '1994-10-17', 'F', '2022-03-24', 'REGISTER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('e123456879','nguoidung3','123456','Lý Văn F', '1995-10-18', 'F', '2022-03-25', 'REGISTER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('f123456879','nguoidung4','123456','Đỗ Văn G', '1996-10-19', 'M', '2022-03-26', 'REGISTER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('g123456879','nguoidung5','123456','Đỗ Tuấn H', '1997-10-20', 'M', '2022-03-27', 'REGISTER');
INSERT INTO `app_test`.`users` (`id`, `username`, `password`, `name`, `date_ob`, `gen`, `created_date`, `role_name`) VALUES ('a123456879','admin','123456','Phạm Văn Q', '1990-10-12', 'M', '2022-02-15', 'ADMIN');
