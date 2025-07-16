const express = require("express");
const connectDB = require("./database");

const app = express();

const User = require("./models/schema");

app.post("/signup", async (req, res) => {
    const obj = {
        firstName: 'Aman',
        lastName: 'Anand',
        age: 27,
        gender: 'Male',
        email: 'amananand@google.com',
        password: 'password@123',
        phone: 9871599423
    };

    const user = new User(obj);

    try{
        await user.save();
        res.send("Data added successfully"); 
    } catch(err){
        res.status(400).end("Error saving user", err.message)
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