# NotLogical

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

Express Version 4.17.3.

Mysql Server version 8.0.28.

# Dependencies
Install Node

Install Angular

	Install cdk in the angular project
	
Install Express

In the /server

	npm install mysql2
	
	npm install bcrypt
	
	npm install cors
	
	npm install nodemon
	
	npm install dotenv
	
Install MySql

# Setup MySql
Make a data folder in the server directory, make the whole mysql directory read/write accesible

First Time:

	In cmd as admin:
	
		cd /d C:\Program Files\MySQL\MySQL Server 8.0\bin
		
		mysqld --initialize --console
		
Remember the root password

Start mysql shell

	Enter the password
	
	then:
		set password for root@localhost=''

In MySql command line:
	CREATE DATABASE NOTLOGICAL
	
#	Run the application
Edit then run the script NotLogicalStart.bat to start the application.

Comment out the following in server/index.js:

	db.createDefaultTables();