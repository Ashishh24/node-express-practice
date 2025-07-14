const express = require("express");
const {userAuth} = require("./middlewares/user.js");

const app = express();

app.use("/user/login", (req, res) => {
    res.send("User login!")
});

app.use("/user", userAuth, (req, res) => {
    res.send("User done!")
});


app.listen(3000, () => {
    console.log("server connected");
});