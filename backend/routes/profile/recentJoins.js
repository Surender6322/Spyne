const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const auth = require("../../middleware/auth");

router.get("/recentJoins", auth, async(req, res) => {
    const sql = "SELECT * FROM USERS WHERE id != ? ORDER BY id DESC LIMIT 5;";
    db.query(sql, [req.user[0].id], async(err, result) => {
        if (err) {
            return res.json({
                error: "Failed to Fetch Recent Joins",
            });
        }
        res.json({
            message: "working",
            users: result,
        });
    });
});

module.exports = router;