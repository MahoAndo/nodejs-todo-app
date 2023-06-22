const { log } = require("console");
const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log("connecting detabase"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;