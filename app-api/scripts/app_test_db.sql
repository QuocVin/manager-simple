----
--USE master;  
--GO  
--IF DB_ID (N'APP_TEST') IS NOT NULL  
--DROP DATABASE APP_TEST;  
--GO  
--CREATE DATABASE APP_TEST  
--COLLATE Vietnamese_100_CS_AS_KS_WS_SC_UTF8;  
--GO 

--	tài khoản người dùng
USE APP_TEST; 
CREATE TABLE [dbo].[users](
	[id]			[nvarchar](50) PRIMARY KEY NOT NULL,
	[username]		[nvarchar](50) NOT NULL,
	[password]		[nvarchar](max) NOT NULL,
	[name]			[nvarchar](50) NOT NULL,
	[date_ob]		[datetime] NULL,
	[gen]			[nvarchar](10) NULL,
	[created_date]	[datetime] NULL,
	[role_name]		[nvarchar](50) DEFAULT 'REGISTER' NULL,
	--role_name:	ADMIN
	--				MANAGER
	--				REGISTER
);

INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name)
OUTPUT Inserted.*
VALUES('a123456879','admin','123456','Nguyễn Văn Q', 1990-10-14, 'M', 2022-20-03, 'ADMIN');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('j123456879','quanly1','123456','Nguyễn Văn A', 1991-10-14, 'M', 2022-21-03, 'MANAGER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('b123456879','quanly2','123456','Nguyễn Văn B', 1992-10-14, 'F', 2022-22-03, 'MANAGER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('c123456879','nguoidung1','123456','Nguyễn Văn C', 1993-10-14, 'M', 2022-23-03, 'REGISTER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('d123456879','nguoidung2','123456','Nguyễn Văn E', 1994-10-14, 'F', 2022-23-03, 'REGISTER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('e123456879','nguoidung3','123456','Nguyễn Văn F', 1995-10-14, 'F', 2022-24-03, 'REGISTER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('f123456879','nguoidung4','123456','Nguyễn Văn G', 1996-10-14, 'M', 2022-25-03, 'REGISTER');
INSERT INTO [users](id,username,password,name,date_ob,gen,created_date,role_name) VALUES('g123456879','nguoidung5','123456','Nguyễn Văn H', 1997-10-14, 'M', 2022-25-03, 'REGISTER');


CREATE TABLE [dbo].[token](
	[id]		[nvarchar](50) NOT NULL,
	[user_id]	[nvarchar](50) PRIMARY KEY NOT NULL,
	[token]		[nvarchar](max) NOT NULL,
);
