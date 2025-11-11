//I assign the element in my html, the button to a variable to work with it in JS, 
// using const so I do not assign other elements to these vars by accident with let.

const addButton = document.getElementById("taskaddbutton");
const taskToAdd = document.getElementById("taskaddinput");
const taskList = document.getElementById("tasklist");
function addTask(taskToAdd) {
    taskList.innerHTML += <li>${taskToAdd}</li>;
}
//Adding a event listener to the button, this way i can listen to certain actions performed to my button. 
//Using click event listener here, takes 2 args, type of event, and function to run
addButton.addEventListener('click', addTask)