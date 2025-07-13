const express = require("express");

const app = express();


// An example where we can use middlewares is authentication. 
// Suppose if we have an admin dashboard, from where we have to call some API, 
// every time we have to check whether it's an admin or not.
// Here we can use middlewares



app.listen(3000, () => {
    console.log("server connected");
});