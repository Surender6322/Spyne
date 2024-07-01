const express = require("express");
require("dotenv").config(); //to access features of .env and run .env files always run in the start of application
const helmet = require("helmet");
require("./db/sql"); //running database

const registerUser = require("./routes/auth/register");
const loginUser = require("./routes/auth/login");

const createPost = require("./routes/posts/createPost");
const allPosts = require("./routes/posts/allPosts");
const likePost = require("./routes/posts/like");
const unlikePost = require("./routes/posts/unlike");
const createComment = require("./routes/posts/createComments");
const getComments = require("./routes/posts/getComments");
const deleteComment = require("./routes/posts/deleteComment");
const updateComment = require("./routes/posts/updateComment");

const getProfile = require("./routes/profile/profile");
const getHashtags = require("./routes/profile/hashtags");
const searchProfiles = require("./routes/profile/searchProfiles");
const searchHashtags = require("./routes/profile/searchHashtags");

const recentJoins = require("./routes/profile/recentJoins");

const follow = require("./routes/profile/follow");
const unFollow = require("./routes/profile/unfollow");

const app = express();
app.use(express.json()); //convert data of incoming requests to json
app.use(helmet()); //for securing our application and preventing from attacks like xss attacks.

const PORT = 5000 || process.env.PORT;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type,Accept,x-auth-token"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET , POST , PATCH , DELETE");
    next();
});

app.use("/api", registerUser);
app.use("/api", loginUser);

app.use("/api/posts", createPost);
app.use("/api/posts", allPosts);
app.use("/api/posts", likePost);
app.use("/api/posts", unlikePost);
app.use("/api/posts", createComment);
app.use("/api/posts", getComments);
app.use("/api/posts", deleteComment);
app.use("/api/posts", updateComment);

app.use("/api/posts", getProfile);
app.use("/api/posts", getHashtags);
app.use("/api/posts", searchProfiles);
app.use("/api/posts", searchHashtags);

app.use("/api/user", recentJoins);

app.use("/api/user", follow);
app.use("/api/user", unFollow);

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});