//-------------
//get element
//-------------
const showLinkDOM = document.getElementById("showLink");
const formDOM = document.querySelector(".login-form");   //send trigger
const usernameInputDOM = document.querySelector(".task-input1"); //input element
const emailInputDOM = document.querySelector(".task-input2"); //input element
const formAlertDOM = document.querySelector(".form-alert");

//---------------------------------------------------
//login user
//---------------------------------------------------
showLinkDOM.style.visibility= "hidden";
formDOM.addEventListener("submit", async(event) => {
    //execute functions without reloading
    event.preventDefault();
    const inputUserName = usernameInputDOM.value;
    const inputEmail = emailInputDOM.value;
    try {
        // get data
        await axios.post("/api/users/login", {username: inputUserName, email: inputEmail});
        showLinkDOM.style.visibility = "visible";
    } catch (err) {
        console.log(err);
        //showing invalid message
        showLinkDOM.style.visibility = "hidden";
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "The user does not exist. Please try again.";
    }
    //error message is erased after 3 seconds
    setTimeout(() => {
        formAlertDOM.style.display = "none";
    }, 3000);
});
