const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    //Data Structure Setting
    name: {
        type: String,
        required: [true, "Enter a task name."],
        trim: true, //trimming
        maxlength:[20, "Task name can be a maximum of 20 characters."],
    },
    completed:{
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);