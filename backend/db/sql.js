const mysql = require("mysql");

var db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if (err) {
        return console.log("MYSQL connection failed" + err);
    }
    console.log("MYSQL connected successfully");
});

module.exports = db