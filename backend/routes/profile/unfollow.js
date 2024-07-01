const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../db/sql");

router.post("/unFollow", auth, async(req, res) => {
    const data = {
        follower_id: req.user[0].id,
        following_id: req.body.following_id,
    };
    const sql =
        "DELETE FROM followers WHERE follower_id = ? AND following_id = ?";
    await db.query(
        sql, [data.follower_id, data.following_id],
        async(err, result) => {
            if (err) {
                return res.json({
                    error: "Unable to Delete",
                });
            }
            res.json({
                message: "UnFollow Successfully",
            });
        }
    );
});

module.exports = router;