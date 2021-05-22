const express = require('express');
var mysql = require("mysql"); //require mysql
const app = express();
var dotenv = require("dotenv"); //require dot env for environment variables
dotenv.config(); // configure dot env

var cors = require("cors"); //require cors for cross server calling
app.use(cors()); //use cors
app.options("*", cors()); //allow cors from any IP

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
    // res.send('Hello World!')
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
        if (result) {
            res.send({ "exists": true, "id": result[0]["id"] });  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_user_details', (req, res) => {
    connection = openDBConnection();

    var userID = req.query["userID"];

    var sql = `SELECT * FROM user WHERE ID = \"${userID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_user_list', (req, res) => {
    connection = openDBConnection();

    var groupID = req.query["groupID"];

    var sql = `SELECT * FROM user WHERE group_id = \"${groupID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_item_list', (req, res) => {
    connection = openDBConnection();

    var sql = `SELECT * FROM item;`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_owing_detailed', (req, res) => {
    connection = openDBConnection();

    var userID = req.query["userID"];

    var sql = `SELECT * FROM owing_detailed WHERE from_id = \"${userID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_owed_detailed', (req, res) => {
    connection = openDBConnection();

    var userID = req.query["userID"];

    var sql = `SELECT * FROM owed_detailed WHERE to_id = \"${userID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_owing_summary', (req, res) => {
    connection = openDBConnection();

    var userID = req.query["userID"];

    var sql = `SELECT * FROM owing_summary WHERE from_id = \"${userID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_owed_summary', (req, res) => {
    connection = openDBConnection();

    var userID = req.query["userID"];

    var sql = `SELECT * FROM owed_summary WHERE to_id = \"${userID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/get_all_unpaid', (req, res) => {
    connection = openDBConnection();

    var sql = `SELECT * FROM all_unpaid_records;`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.get('/submit_record', (req, res) => {
    connection = openDBConnection();

    //owed_id, owing_id, item_id, value, date_submitted
    var userID = req.query["userID"];
    var owedID = req.query["owedID"];
    var owingID = req.query["owingID"];
    var item = req.query["item"];
    var amount = req.query["amount"];

    var sql = `INSERT INTO record (item, value, submitted_by_id, owed_id, owing_id, date_submitted)
    values (` + mysql.escape(item) + `, ` + mysql.escape(amount) + `, ` + mysql.escape(userID) + `, ` + mysql.escape(owedID) + `,
    ` + mysql.escape(owingID) + `, current_timestamp());`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);
        }
    });
    connection.end(); //close the connection
});

app.get('/update_record_paid', (req, res) => {
    connection = openDBConnection();

    var recordID = req.query["recordID"];

    var sql = `UPDATE record SET paid = 1, date_paid = current_timestamp() WHERE ID = \"${recordID}\";`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        }
        if (result) {
            res.send(result);  //if the result exists
        } else {
            res.send(false); //else send false
        }
    });
    connection.end(); //close the connection
});

app.listen(process.env.PORT | 3000, () => {
});