const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const auth = require("../../middleware/auth");

router.delete("/comment/delete", auth, (req, res) => {
    let comment_id = req.query.comment_id;
    let sql = "DELETE FROM comments WHERE com_id = ?";
    db.query(sql, [comment_id], (err, result) => {
        if (err) {
            return res.json({
                error: "Unable to delete comment",
            });
        }
        res.json({
            message: "Successfully deleted!!",
            result,
        });
    });
});

module.exports = router;