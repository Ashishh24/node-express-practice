const express = require("express");
const {userAuth} = require("../middlewares/user");

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequet", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " " + user.lastName + " sent a connection requet!")
})


module.exports = requestRouter;