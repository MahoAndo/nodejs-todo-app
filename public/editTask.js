//-------------
//get element
//-------------
const taskIdDOM = document.querySelector(".task-edit-id"); 
const taskNameDOM = document.querySelector(".task-edit-name"); 
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");


const params = window.location.search; //get task id
const id = new URLSearchParams(params).get("id");
console.log(id);

//------------------------------
//get one specific task
//------------------------------
const showTask = async () => {
    try {
        //destructuring assignment of data
        const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task;

        taskIdDOM.textContent = _id;
        taskNameDOM.value = name;

        // checkbox
        if(completed)
            taskCompletedDOM.checked = true;
    } catch (err) {
        console.log(err);
    }
};

showTask();


//------------------------------
//edit one specific task
//------------------------------
editFormDOM.addEventListener("submit", async(event) => {
    //execute functions without reloading
    event.preventDefault();
    try {
        // patch data
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        const {data: task } = await axios.patch(
            `/api/v1/tasks/${id}`, 
            {
                name: taskName,
                completed: taskCompleted,
            }
        );
        //showing edited message
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Edited a task.";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
    //error message is erased after 3 seconds
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        //clear class settings
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});