//-------------
//get element
//-------------
const tasksDOM = document.querySelector(".tasks");  // data from DB
const formDOM = document.querySelector(".task-form");   //send trigger
const taskInputDOM = document.querySelector(".task-input"); //input element
const formAlertDOM = document.querySelector(".form-alert");


//---------------------------------------------------
// getting tasks data from '/api/v1/tasks' (mongoDB)
//---------------------------------------------------
const showTasks = async () => {
    try {
        //using self API(Get 'data' in the form of 'task’)
        const {data: tasks} = await axios.get("/api/v1/tasks");

        //When there is no task
        if(tasks.length < 1){
            tasksDOM.innerHTML = `<h5 class="empty-list">NO TASKS</h5>`
            return;
        }

        //output all tasks one by one
        const allTasks = tasks.map((task) => {
            //destructuring assignment of data
            const {completed, _id, name} = task

            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span> <i class="fas fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!-- edit link-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!-- dust box link-->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>`;
        })
        .join("");  //eliminate commas between data
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

//---------------------------------------------------
//create a new task
//---------------------------------------------------
formDOM.addEventListener("submit", async(event) => {
    //execute functions without reloading
    event.preventDefault();
    const inputName = taskInputDOM.value;
    try {
        // post data
        await axios.post("/api/v1/tasks", {name: inputName});
        //show data
        showTasks();
        //empty text box after creating data
        taskInputDOM.value = "";
        //showing added message
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Added a task.";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        //showing invalid message
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "Invalid. Please try again.";
    }
    //error message is erased after 3 seconds
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        //clear class settings
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//---------------------------------------------------
//delete task
//---------------------------------------------------
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;

    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            //show data
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }

});