const express = require("express");
const connectDB = require("./database");
const cookieParser = require("cookie-parser");

const app = express();

const User = require("./models/schema");

app.use(express.json()); // a middleware that converts all json to js object
app.use(cookieParser()); //Get cookie from web

const authRouter = require("./routesContainer/auth");
const profileRouter = require("./routesContainer/profile");
const requestRouter = require("./routesContainer/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});