const express = require("express");
const {userAuth} = require("../middlewares/user");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try{
        user = req.user;
        if(!user){
            throw new Error("Invalid Userr!!")
        }
        res.send(user);
    }
    catch(err) {
        res.status(402).send("ERROR: " + err.message);
    }
})

module.exports = profileRouter;