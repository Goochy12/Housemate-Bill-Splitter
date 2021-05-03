const express = require('express');
var mysql = require("mysql"); //require mysql
const app = express();
var dotenv = require("dotenv"); //require dot env for environment variables
dotenv.config(); // configure dot env

//method to open a connection to the database given paramaters
function openDBConnection() {
    var connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    return connection;  //return the open connection
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/authenticate', (req, res) => {
    connection = openDBConnection();
    var username = req.query["username"]; //get the filename parameter
    var password = req.query["password"]; //get the filename parameter

    var sql = `SELECT * FROM authentication WHERE username=\"${username}\" AND password = \"${password}\";`; //create the query
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result[0]) {
            res.send(true);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.listen(process.env.PORT | 3000, () => {
});