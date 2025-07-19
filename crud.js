const express = require("express");
const connectDB = require("./database");

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("USer added successfully!!");
    } catch(err) {
        res.status(402).send("USer not added");
    }
});

app.get("/user", async (req, res) => {
    const userlastname = req.body.lastName;

    try{
        const users = await User.find({lastName: userlastname});
        if(users.length === 0) {
            res.status(404).send("User not found!")
        }
        res.send(users);
    } catch(err) {
        res.status(400).send("something went wrong!!");
    }
});

app.delete("/user", async (req, res) => {
    const userID = req.body.id;
    try {
        console.log(userID);
        
        const user = await User.findByIdAndDelete(userID);
        res.send("User deleted successfully!")
    } catch(err) {
        res.status(400).send("something went wrong!!");
    }
})

app.patch("/user", async (req, res) => {
    const userID = req.body.id;
    const data = req.body.data;
    try {
        // const user = await User.findByIdAndUpdate(userID, {age: 35});
        const user = await User.findByIdAndUpdate(userID, data);
        res.send("User updated successfully!")
    } catch(err) {
        res.status(400).send("something went wrong!!");
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