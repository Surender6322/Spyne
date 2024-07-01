const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.post("/dislike/:id", auth, (req, res) => {
    if (req.params.id) {
        let data = {
            l_post_id: parseInt(req.params.id),
            l_user_id: req.user[0].id,
        };

        let sql = "SELECT * FROM likes WHERE l_user_id = ? AND l_post_id = ?";
        db.query(sql, [data.l_user_id, data.l_post_id], (err, result) => {
            if (err) {
                res.json({
                    disLikeFailed: "Unable to dislike try again!",
                });
            }
            if (result.length > 0) {
                sql = `DELETE FROM likes WHERE likes_id = ?`;
                db.query(sql, result[0].likes_id, (e, r) => {
                    if (e) {
                        res.json({
                            disLikeFailed: "Unable to dislike try again!",
                        });
                    } else {
                        res.json({
                            message: "Successfully dislike the post!",
                            id: result.likes_id,
                        });
                    }
                });
            } else {
                res.json({
                    disLikeFailed: "Firstly like the post!",
                });
            }
        });
    }
});

module.exports = router;