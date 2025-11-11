//I assign the element in my html, the button to a variable to work with it in JS, 
// using const so I do not assign other elements to these vars by accident with let.

const addButton = document.getElementById("taskaddbutton");
//To get not the item but the actual value of the input you getElementById and add .value
//const taskToAdd = document.getElementById("taskaddinput").value;
const taskList = document.getElementById("tasklist");

function addTask() {
    //.innerHTML += takes that string and converts it to real HTML elements
  let taskToAdd = document.getElementById("taskaddinput").value;
    taskList.innerHTML += `<li>${taskToAdd}</li>`;
    //set the input box to empty after adding task
    document.getElementById("taskaddinput").value = "";
}
//Adding a event listener to the button, this way i can listen to certain actions performed to my button. 
//Using click event listener here, takes 2 args, type of event, and function to run
//dont use the addTask() as it calls the function instantly use addTask and let the eventlistener trigger the function itself
addButton.addEventListener('click', addTask)