const jwt = require("jsonwebtoken");
const db = require("../db/sql");

const auth = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).send("Please Authenticate...");
    }
    const decode = jwt.verify(token, "secret");
    const sql = "SELECT * FROM users WHERE id = " + decode.id;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).send("Please Authenticate...");
        } else {
            req.user = result;
            next();
        }
    });
};

module.exports = auth;