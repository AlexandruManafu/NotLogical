const mysql = require("mysql2");

connection  = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'',
    database:'notlogical'
    });

class Database{
    constructor(connection){
        this.connection = connection;
    }

    async query(sql)
    {
        this.connection.query(
            sql,
            function(err, results, fields) {
                console.log("Query");
                if(err != undefined && err != null)
                    console.log(err);
                else
                    console.log("Success");
            }
          );
    }

    async insert(sql,valuesArray)
    {
        connection.execute(
            sql,
            valuesArray,
            function(err, results, fields) {
                console.log("Insert");
                if(err != undefined && err != null)
                    console.log(err);
                else
                    console.log("Success");
            }
        );
    }

    async update(sql, valuesArray)
    {
        connection.execute(
            sql,
            valuesArray,
            function(err, results, fields) {
                console.log("Update");
                if(err != undefined && err != null)
                {
                    console.log("Error");
                    console.log(err);
                }
                else
                    console.log("Success");
            }
        );
    }

    async exists(sql)
    {
        let result = await this.count(sql)
        return result > 0;
    }

    async select(sql, valuesArray)
    {
        let result = await connection.promise().execute(
            sql,
            valuesArray,
            function(err, results, fields) {
                console.log("Select");
                if(err != undefined && err != null)
                {
                    console.log("Error");
                    console.log(err);
                }
                else
                {
                    console.log("Success");
                }
            }
        );
        return result[0];
    }

    async delete(sql, valuesArray)
    {
        let result = await connection.promise().execute(
            sql,
            valuesArray,
            function(err, results, fields) {
                console.log("Delete");
                if(err != undefined && err != null)
                {
                    console.log("Error");
                    console.log(err);
                }
                else
                {
                    console.log("Success");
                }
            }
        );
        return result;
    }

    async count(sql)
    {
        let result = await this.connection.promise().query(sql);
        return result[0].length;
    }

    async isDbEmpty()
    {
        let sql = "SHOW TABLES from notlogical";
        let result = await this.exists(sql);

        result = !result;
        return result;
    }

    async createDefaultTables(force = false){

        let empty = await this.isDbEmpty();
        if(empty || force)
        {
            let sql = "CREATE TABLE users( ";
            sql+= "id int(10) PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL,";
            sql+= "email VARCHAR(128) NOT NULL, password VARCHAR(128) NOT NULL );";

            sql+= "CREATE TABLE circuit_entries( ";
            sql+= "id int(10) PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL,";
            sql+= "ownerId int(10) NOT NULL, normalizedCircuit LONGTEXT NOT NULL ,";
            sql+= "views int(10) NOT NULL, isPublic boolean DEFAULT false NOT NULL );";

            sql+= "CREATE TABLE build_circuit_levels( ";
            sql+= "id int(10) PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, instructions TEXT NOT NULL, ";
            sql+= "ownerId int(10) NOT NULL, tests LONGTEXT NOT NULL, partialSolution LONGTEXT NOT NULL, ";
            sql+= "views int(10) NOT NULL, numberCorrectSubmissions int(10) NOT NULL, isPublic boolean DEFAULT true NOT NULL );";

            await db.query(sql);
        }
    }
}
let db = new Database(connection);
module.exports = db;

