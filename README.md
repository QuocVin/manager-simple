# Manager-simple web application

    Use React with Material UI for Front - End
    Use Node JS Express to build API service with database Mysql

    And use some api json server simple in Home page


# Install
    Install package
        manager-simple\app-api> npm install

        manager-simple\app-api> npm install

    Install JSON Server
        manager-simple\app-ui> npm install -g json-server

    Database Mysql
        Open application MysQL Workbench
        Get file scripts in path: manager-simple\app-api\scripts\app_db_mysql.sql
        Execute all command in file app_db_mysql.sql to create and import database

    Update config to connect database: change 'username' and 'password' in file
        manager-simple\app-api\src\database\db-access.js


# Run
    manager-simple\app-api> npm run start       to run server api with node JS
    manager-simple\app-ui> npm run start        to build manager application to website

    manager-simple\app-ui> json-server.cmd -p 3001 -w data.json         to run server json



# Description
    Login account with Role
        username    ||  password    ||  role

        admin       ||  123456      ||  ADMIN
        quanly1     ||  123456      ||  MANAGER
        nguoidung1  ||  123456      ||  REGISTER

    Or Register to create new account have role REGISTER