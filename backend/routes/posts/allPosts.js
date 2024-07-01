const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.get("/all", auth, (req, res) => {
    let sql =
        // "SELECT users.id,posts.post_id,users.name,users.profilePic,users.created_at,posts.imageUrl,posts.description,COUNT(posts.post_id) AS likes,likes.l_user_id,likes.l_post_id FROM users JOIN posts ON users.id = posts.user_id LEFT JOIN likes ON posts.post_id = likes.l_post_id GROUP BY(posts.post_id) ORDER BY posts.post_id DESC";
        "SELECT * FROM users JOIN posts ON users.id = posts.user_id ORDER BY post_id DESC";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({
                error: "Failed! Fetching latest Posts",
            });
        }
        sql = "SELECT * FROM likes;";
        db.query(sql, (error, rslt) => {
            if (error) {
                return res.json({
                    error: "Failed to fetch latest likes",
                });
            }
            result.forEach((data1, index) => {
                let isFind = false;
                rslt.forEach((data2) => {
                    if (data2.l_post_id === data1.post_id) {
                        isFind = true;
                        let likes = [];
                        if (result[index].likes) {
                            likes = [
                                ...result[index].likes,
                                {
                                    ...data2,
                                },
                            ];
                        } else {
                            likes = [{
                                ...data2,
                            }, ];
                        }
                        result[index] = {
                            ...data1,
                            likes,
                        };
                    }
                });
                if (!isFind) {
                    result[index].likes = [];
                }
            });
        });
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
            res.json(result);
        });
    });
});

module.exports = router;