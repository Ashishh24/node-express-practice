const express = require("express");
const {userAuth} = require("../middlewares/user");

const Connection = require("../models/connection");
const User = require("../models/schema");

const requestRouter = express.Router();

requestRouter.post("/requet/send/:status/:userID", userAuth, async (req, res) => {
    try {
        const toUserID = req.params.userID;
        const status = req.params.status;
        const fromUserID = req.user._id;

        const toUser = await User.findById(toUserID);
        if(!toUser){
            throw new Error("User not found!!!");
        }

        const allowed_status = ["connect", "ignore"];
        if(!allowed_status.includes(status)){
            throw new Error("Invalid request");
        }

        const existingConnectionRequest = await Connection.findOne({
            $or: [ // or condition in MongoDB
                {fromUserID, toUserID},
                {fromUserID: toUserID, toUserID: fromUserID},
            ]
        })

        if(existingConnectionRequest){
            throw new Error("Connection request already exist!!");
        }
        else{
            const connection = new Connection({fromUserID, toUserID, status});
            await connection.save();
            res.send(req.user.firstName + " " + req.user.lastName + " sent a connection requet!");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = requestRouter;