const express = require("express");
const connectDB = require("./database");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const {userAuth} = require("./middlewares/user");

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object
app.use(cookieParser()); // Get cookie from web

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const isUser = await User.findOne({email: email});

        if(!isUser){
            throw new Error("Invalid email!!")
        }
        const isPasswordValid = await bcrypt.compare(password, isUser.password)
        if(!isPasswordValid){
            throw new Error("Invalid password!!");
        }
        else{
            var token = jwt.sign({ _id: isUser._id }, 'Link@in@1804', {
                expiresIn: '1d' // token expiry time
            });
            res.cookie("token", token, {
                expires: new Date(Date.now() + 3600000), // cookie erpiry time
            });
            res.send("Login Successful!!!!😊")
        }
    }
    catch(err) {
        res.status(402).send("ERROR: " + err.message);
    }
});

app.get("/profile", userAuth, async (req, res) => {
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

app.get("/sendConnectionRequet", userAuth, (req, res) => {
    // res.send("Connection Request Sent!!")
    const user = req.user;
    res.send(user.firstName + " " + user.lastName + " sent a connection requet!")
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