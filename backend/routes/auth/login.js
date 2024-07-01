const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db/sql");
const router = express.Router();

router.post(
    "/login", [
        check("email", "Invalid Email").isEmail(),
        check("password", "Invalid Password").isLength({
            min: 5,
            max: 20,
        }),
    ],
    async(req, res) => {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.json(errors);
        }
        const user = req.body;
        let sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, user.email, async(err, result) => {
            if (err) {
                return res.json({
                    error: "Something went wrong.Try again later",
                });
            } else {
                if (result.length === 0) {
                    return res.json({
                        error: "Invalid Email or Password",
                    });
                }
                const isCompared = await bcrypt.compare(
                    user.password,
                    result[0].password
                );
                const token = await jwt.sign({
                        id: result[0].id,
                        name: result[0].name,
                        email: result[0].email,
                        password: result[0].password,
                        profilePic: result[0].profilePic,
                    },
                    "secret", {
                        expiresIn: "7 days",
                    }
                );
                if (isCompared) {
                    return res.json({
                        message: "Successfully LogIn",
                        token,
                    });
                }
                res.json({
                    error: "Invalid Email or Password",
                });
            }
        });
    }
);

module.exports = router;