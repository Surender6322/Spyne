const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.get("/profile/:id", auth, (req, res) => {
    let sql = "SELECT * FROM users WHERE users.id = ?";
    db.query(sql, req.params.id, (er, re) => {
        if (er) {
            return res.json({
                error: "Failed to fetch Profile",
            });
        }
        sql =
            "SELECT * FROM users JOIN posts ON users.id = posts.user_id WHERE users.id = ? ORDER BY posts.post_id DESC";
        db.query(sql, req.params.id, (err, result) => {
            if (err) {
                return res.json({
                    error: "Failed! Fetching My Posts",
                });
            }
            sql =
                "SELECT com_id,c_post_id,message,id,name,profilePic FROM comments JOIN users ON comments.c_user_id = users.id ORDER BY comments.com_id;";
            db.query(sql, (e, r) => {
                if (e) {
                    return res.json({
                        error: "Failed to fetch latest comments",
                    });
                }
                result.forEach((data1, index) => {
                    let isFind = false;
                    r.forEach((data2) => {
                        if (data2.c_post_id === data1.post_id) {
                            isFind = true;
                            let comments = [];
                            if (result[index].comments) {
                                comments = [
                                    ...result[index].comments,
                                    {
                                        ...data2,
                                    },
                                ];
                            } else {
                                comments = [{
                                    ...data2,
                                }, ];
                            }
                            result[index] = {
                                ...data1,
                                comments,
                            };
                        }
                    });
                    if (!isFind) {
                        result[index].comments = [];
                    }
                    result[index].comments.reverse();
                });
                sql = "SELECT * FROM followers WHERE follower_id = ?";
                db.query(sql, req.params.id, (err, r1) => {
                    if (err) {
                        return res.json({
                            error: "Failed to fetch followers",
                        });
                    }
                    sql = "SELECT * FROM followers WHERE following_id = ?";
                    db.query(sql, req.params.id, (err, r2) => {
                        if (err) {
                            return res.json({
                                error: "Failed to fetch followers",
                            });
                        }
                        res.json({
                            user: re[0],
                            totalFollowings: r1,
                            totalFollowers: r2,
                            result: result,
                        });
                    });
                });
                // res.json({
                //     user: re[0],
                //     result: result,
                // });
            });
        });
    });
});

module.exports = router;