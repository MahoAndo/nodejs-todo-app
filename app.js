const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config(); // read env file 
app.use(express.json());    //convert to json format
app.use(express.static("./public"));    //read static files

const PORT = 3000;

//routing setup
app.use("/api/v1/tasks", taskRoute);

//database and connections
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, console.log("server is running."));
    } catch (err) {
        console.log(err);
    }
}

start();