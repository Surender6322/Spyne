const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.post("/searchedUsers", auth, (req, res) => {
    let sql = "SELECT * FROM users WHERE name LIKE ?";
    db.query(sql, [`%${req.body.name}%`], (err, result) => {
        if (err) {
            return res.json({
                fetchUsersFailed: "Unable to fetch users",
            });
        }
        res.json({
            message: "Successfully fetched!!",
            result,
        });
    });
});

module.exports = router;