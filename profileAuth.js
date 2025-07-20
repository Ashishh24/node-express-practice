const express = require("express");
const connectDB = require("./database");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object
app.use(cookieParser()); //Get cookie from web

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
            var token = jwt.sign({ _id: isUser._id }, 'Link@in@1804');
            res.cookie("token", token);
            res.send("Login Successful!!!!😊")
        }
    }
    catch(err) {
        res.status(402).send("ERROR: " + err.message);
    }
});

app.get("/profile", async (req, res) => {
    try{
        const cookie = req.cookies;
        const {token} = cookie;
        if(!token){
            throw new Error("Invalid Token!");
        }
        const decodedId = jwt.verify(token, 'Link@in@1804');
        const {_id} = decodedId; 

        const user = await User.findById(_id);

        res.send(user);
    }
    catch(err) {
        res.status(402).send("ERROR: " + err.message);
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