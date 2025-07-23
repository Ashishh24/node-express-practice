const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromUserID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toUserID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["connect", "ignore", "accept", "reject"],
        },
    },
    {
        timestamps: true
    }
);

// pre method
connectionSchema.pre("save", function (next) {
    const conn = this;
    //check if fromUserId is same as toUserId:
    if(this.fromUserID.equals(this.toUserID)){
        throw new Error("can't send req to yourself!!");
    }
    next();
})

const Connection = new mongoose.model("Connection", connectionSchema)

module.exports = Connection;