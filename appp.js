const express = require("express");
const connectDB = require("./database");

const app = express();

//The correct way is to connect to db first and then listen to the incoming requests 
connectDB().then(() => {
    console.log("DB connected :)");
    app.listen(3000, () => {
        console.log("server test connected");
    });
}).catch((err) => {
    console.log(err);
    console.log("DB connected :(");
});