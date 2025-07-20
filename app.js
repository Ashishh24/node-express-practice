const express = require("express");
const connectDB = require("./database");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const {userAuth} = require("./middlewares/user");

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object
app.use(cookieParser()); //Get cookie from web

connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});