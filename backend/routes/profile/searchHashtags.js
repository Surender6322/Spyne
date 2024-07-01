const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.post("/searchHashtags", auth, (req, res) => {
    let sql = "SELECT * FROM hashtag WHERE h_title LIKE ?";
    db.query(sql, [`%${req.body.title}%`], (err, result) => {
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