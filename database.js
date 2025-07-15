const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ashishhh:AshishhhPasswordd@cluster0.ymgrbgi.mongodb.net/User");
};

module.exports = connectDB;

// connectDB().then(() => {
//     console.log("DB connected :)");
// }).catch((err) => {
//     console.log(err);
//     console.log("DB connected :(");
// });


