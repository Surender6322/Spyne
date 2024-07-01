const express = require("express");
const router = express.Router();
const db = require("../../db/sql");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

router.post(
    "/comment/:id",
    auth, [
        check("message", "Must be less than 255 characters").isLength({
            max: 255,
        }),
    ],
    (req, res) => {
        if (req.params.id) {
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.json(errors);
            }
            if (!req.body.message) {
                return res.json({
                    error: "Comment is required",
                });
            }
            // let sql =
            //   "CREATE TABLE comments(com_id INT AUTO_INCREMENT PRIMARY KEY,c_post_id INT NOT NULL , c_user_id INT NOT NULL,message VARCHAR(255) NOT NULL,FOREIGN KEY(c_post_id) REFERENCES posts(post_id) , FOREIGN KEY(c_user_id) REFERENCES users(id));";
            // db.query(sql, (err, result) => {
            //   if (err) {
            //     console.log(err);
            //     return res.json({
            //       error: "Table creation failed",
            //     });
            //   }
            //   res.json({
            //     message: "Table successfully created!",
            //   });
            // });
            let data = {
                c_post_id: parseInt(req.params.id),
                c_user_id: req.user[0].id,
                message: req.body.message,
            };
            let sql = "INSERT INTO comments SET ? ";
            db.query(sql, data, (err, result) => {
                if (err) {
                    return res.json({
                        likeFailed: "Unable to comment try again!",
                    });
                }
                res.json({
                    message: "Successfully comment on the post!",
                    id: result.insertId,
                });
            });
        }
    }
);

module.exports = router;