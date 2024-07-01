const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const auth = require("../../middleware/auth");

router.get("/hashtag/:id", auth, (req, res) => {
    let sql = "SELECT * FROM post_hashtag WHERE post_hashtag.h_id = ?";
    console.log(req.params.id);
    db.query(sql, req.params.id, async(err, result) => {
        if (err) {
            return res.json({
                error: "Unable to fetch posts",
            });
        }
        console.log(result);
        return res.json({
            success: "successfully fetched!!",
            result: result,
        });
    });
});

module.exports = router;