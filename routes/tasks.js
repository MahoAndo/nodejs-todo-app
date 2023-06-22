const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");


//get all tasks
router.get("/", getAllTasks);
//make a new task
router.post("/", createTask);
//get a task
router.get("/:id", getSingleTask);
//update a task
router.patch("/:id", updateTask);
//delete a task
router.delete("/:id", deleteTask);

module.exports = router;