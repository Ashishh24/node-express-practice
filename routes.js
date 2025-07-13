const express = require("express");

const app = express();

//********** How to send response by API
// 1. all requests
app.use("/user", (req, res) => {
    res.send("Reponse");
})

// 2. only get requests
app.get("/user", (req, res) => {
    res.send("Reponse");
})

// 3. only post requests
app.post("/user", (req, res) => {
    res.send("Reponse");
})

// regex in route => can use ?, +, *, ()
// ? => colou?r - color or colour
// + => ab+c - abc, abbc, abbbbc, abb..c - b should be > 0
// * => ab+c - ac, abc, abbc, abbbbc, abb..c - b should be >= 0
// () => a(bc)*d - ad, abcd, abcbcd,...


//********** two ways to read data from API
// 1. API - user?userID=101&name=Ashish
app.get("/user", (req, res) => {
    console.log(req.query);
    res.send("hello get test");    
});

// 2. API - user/101/Ashish
app.get("/user/:userID/:name", (req, res) => {
    console.log(req.params);
    res.send("hello get test");    
});

//********** Multiple route handlers
app.use("/user", 
    //Request Handlers
    (req, res, next) => {
        console.log("first route handler");
        // res.send("Reponse 1");
        next();
    }, 
    (req, res, next) => {
        console.log("second route handler");
        res.send("Reponse 2");
        // next();//Error, if again next called without res.send()
    }
)

app.use("/user", (req, res, next) => {
    console.log("first route handler");
    next();
}) 
app.use("/user", (req, res, next) => {
    console.log("second route handler");
    res.send("Reponse 2");
})

// The main "Request Handler" containing res.send() is called "Route Handler" 
// and rest with next() are called "Middleware"

// Get /users => middleware chain => route handler

app.listen(3000, () => {
    console.log("server connected");
});