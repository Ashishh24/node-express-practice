const express = require("express");
const connectDB = require("./database");
const User = require("./models/schema");

const app = express();

app.use(express.json()); // a middleware that converts all json to js object

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("USer added successfully!!");
    } catch(err) {
        res.status(402).send("User not added: " + err.message);
    }
});

app.patch("/user", async (req, res) => {
    const userID = req.body.id;
    const data = req.body.data;
    try {
        const allowedUpdates = ["password", "phone", "profilePhoto", "about", "skills"];
        const isAllowedUpdates = Object.keys(data).every((k) => {
            allowedUpdates.includes(k);
        })
        if(!isAllowedUpdates){
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate(userID, data);
        res.send("User updated successfully!")
    } catch(err) {
        res.status(400).send("user update failed: " + err.message);
    }
})

connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});