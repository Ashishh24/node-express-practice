const express = require("express");

const app = express();

// Example - user data handled by Admin 
app.use("/admin/getUserData", (req, res) => {
    const token = "xyz";
    const isAdminAutorized = token === "xyz";
    if(isAdminAutorized){
        res.send("All data displayed!");
    }
    else{
        res.status(401).send("Admin not authorized!");
    }    
})
app.use("/admin/updateUser", (req, res) => {
    const token = "xyz";
    const isAdminAutorized = token === "xyz";
    if(isAdminAutorized){
        res.send("Data updated!!")
    }
    else{
        res.status(401).send("Admin not authorized!");
    }
})
app.use("/admin/deleteUer", (req, res) => {
    const token = "xyz";
    const isAdminAutorized = token === "xyz";
    if(isAdminAutorized){
        res.send("Data deleted!!")
    }
    else{
        res.status(401).send("Admin not authorized!");
    }
    })


// An example where we can use middlewares is authentication. 
// Suppose if we have an admin dashboard, from where we have to call some API, 
// every time we have to check whether it's an admin or not.
// Here we can use middlewares

app.use("/admin", (req, res, next) => {
    const token = "xyza";
    const isAdminAutorized = token === "xyz";
    if(!isAdminAutorized){
        res.status(401).send("Admin not authorized!");
    }
    else{
        next();
    }
})

app.use("/admin/getUserData", (req, res) => {
    res.send("All data displayed!")
})
app.use("/admin/updateUser", (req, res) => {
    res.send("Data updated!!")
})
app.use("/admin/deleteUer", (req, res) => {
    res.send("Data deleted!!")
})


app.listen(3000, () => {
    console.log("server connected");
});