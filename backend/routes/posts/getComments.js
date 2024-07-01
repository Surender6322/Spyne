const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const auth = require("../../middleware/auth");

router.get("/comments", auth, (req, res) => {
    let sql =
        "SELECT * FROM comments JOIN users JOIN posts ON comments.c_user_id = users.id AND posts.post_id = comments.c_post_id;";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({
                commentRFail: "Unable to fetch comments",
            });
        }
        res.json({
            message: "Successfully fetched!!",
            result,
        });
    });
});

module.exports = router;