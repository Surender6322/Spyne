const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../db/sql");

router.post("/follow", auth, async(req, res) => {
    const data = {
        follower_id: req.user[0].id,
        following_id: req.body.following_id,
    };
    const sql = "INSERT INTO followers SET ?";
    await db.query(sql, data, async(err, result) => {
        if (err) {
            return res.json({
                error: "Unable to follow",
            });
        }
        res.json({
            message: "Follow Successfully",
        });
    });
});

router.get("/myFollowing", auth, async(req, res) => {
    const sql = "Select * FROM followers WHERE follower_id = ?";
    db.query(sql, req.user[0].id, async(err, result) => {
        if (err) {
            return res.json({
                error: "Failed to Fetch...",
            });
        }
        res.json({
            message: "Fetched Successfully",
            data: result,
        });
    });
});

module.exports = router;