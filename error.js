const express = require("express");

const app = express();

//********* One Way to handle errors
app.get("/user/getAppData", (req, res) => {
    throw new Error("xncmzxbdbskj");
    res.send("Data sent");
});

//at end of the application
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("something went wrong!")
    }
});

// Bets way = try-catch
app.get("/user/getAppData", (req, res) => {
    try{
        throw new Error("xncmzxbdbskj");
        res.send("Data sent");
    }
    catch(err){
        res.status(500).send("something went wrong!!")
    }
});


app.listen(3000, () => {
    console.log("server test connected");
});