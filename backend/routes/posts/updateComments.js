const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const auth = require("../../middleware/auth");

router.patch("/comment/update", auth, (req, res) => {
    let comment_id = req.body.com_id;
    let sql = "UPDATE comments SET message = ? WHERE com_id = ?";
    db.query(sql, [req.body.message, comment_id], (err, result) => {
        if (err) {
            return res.json({
                error: "Unable to update comment",
            });
        }
        res.json({
            message: "Successfully updated!!",
            result,
        });
    });
});

module.exports = router;