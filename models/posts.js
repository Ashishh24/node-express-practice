const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        mediaURL: {
            type:[String],
        },
        likes: {
            type: Number,
            default: 0
        },
        comments: [
            {
                userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                text: String,
                createdAt: {type: Date, default: Date.now() }
            }
        ],
        createdAt: {
            type: Date, 
            default: Date.now() 
        }
    }
);

postSchema.pre("post", function (next) {
    const post = this;
    if (!post.content && (!post.mediaUrls || post.mediaUrls.length === 0)) {
        throw new Error("Either content or media URL must be provided.");
    } 
    else {
        next();
    }
});

const post = new mongoose.model("Post", postSchema);

module.exports = post;