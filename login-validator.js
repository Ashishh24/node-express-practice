const express = require("express");
const connectDB = require("./database");
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object

app.post("/signup", async (req, res) => {
    try {
        //validate the data
        validateSignupData(req);

        // encrypt the password
        const {firstName, lastName, email, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new user
        const user = new User({
            firstName, lastName, email, password: passwordHash
        });
        await user.save();
        res.send("User added successfully!!");
    } catch(err) {
        res.status(402).send("User not added: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try{
        // Login Validation -> 1. Is email present => if yes, then password check, else, throw error
        const {email, password} = req.body;
        const isUser = await User.findOne({email: email});

        if(!isUser){
            throw new Error("Invalid Credentials!!")
        }
        const isPasswordValid = await bcrypt.compare(password, isUser.password)
        if(!isPasswordValid){
            throw new Error("Invalid Credentials!!");
        }
        else{
            res.send("Login Successful!!!!😊")
        }
    }
    catch(err) {
        res.status(402).send("ERROR: " + err.message);
    }
});

connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});