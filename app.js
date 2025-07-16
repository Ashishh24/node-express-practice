const express = require("express");
const connectDB = require("./database");

const app = express();

const User = require("./models/schema");

connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});