//I assign the element in my html, the button to a variable to work with it in JS,
// using const so I do not assign other elements to these vars by accident with let.

const addButton = document.getElementById("taskaddbutton");
//To get not the item but the actual value of the input you getElementById and add .value
//const taskToAdd = document.getElementById("taskaddinput").value;
const taskList = document.getElementById("tasklist");
//init array to save our data in
let tasksArray = [];
//saving stringifiedtasks in localStorage to array if there are any asks saved to localStorage, else it stays empty from init
if (localStorage.getItem("tasks") != null) {
  let stringifiedtasksArray = localStorage.getItem("tasks");
  tasksArray = JSON.parse(stringifiedtasksArray);
}
//call renderTask to load in the array from localStorage on page load
renderTask();

//current date in format "Monday, Sep 1"
let currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});
//Fill live date in H1
document.querySelector("h1").innerText = currentDate;

function addTask() {
  //saving text from input into variable
  let taskText = document.getElementById("taskaddinput").value;

  //only if taskText is not empty we add it to the array
  if (taskText != "") {
    //adding taskText to the end of the array using .push()
    tasksArray.push(taskText);
  }
  renderTask();
}

//splitting functionality up in different funcitons - mostly for code readability for me and gut feeling
function renderTask() {
  //save all current li's from the ul using queryselector
  //!!lis is a live reference to the actual dom element, NOT a copy -> delete from lis = dfelete from taskList
  let lis = taskList.querySelectorAll("li");
  //iterate over every item in UL and remove it so we have an empty UL
  lis.forEach((li) => {
    li.remove();
  });
  //take the array content and add it to ul through li's using a for each loop.

  //rebuilding the ul on every add to make sure data and dom are always in sync and event listeners are readded on every update.
  tasksArray.forEach((taskitem) => {
    //I need to create the checkbox in the for loop so each li receives their own NEW checkbox with their own event listener - outside the for each would create one checkbox and readd them to each lsit

    //create input item (type checkbox)
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function (event) {
      //adding "anonymous function inside the event listener, simpler way to handle scope at this moment; passing event into the function as a param to use event.target to target the clicked checkbox
      let statecheckbox = event.target;
      //storing the actual list item that is parent of the selected checkbox

      let parentli = statecheckbox.parentElement;
      if (statecheckbox.checked) {
        //adding class completedTask to li if checked or remove it if unchecked to edit styling
        parentli.classList.add("completedTask");
      } else {
        parentli.classList.remove("completedTask");
      }
    });
    //create the delete button
    let deletebutton = document.createElement("button");
//add event listener to that button to listen for a click
    deletebutton.addEventListener("click", function () {
      //function filters all items in array, adds every item that is not = to the one being deleted to new array and saves to "new array" called taskArray - replacing the old one 
      tasksArray = tasksArray.filter(function(task){
        task != taskitem;
      });
      renderTask();
    })

    //create a li
    let taskli = document.createElement("li");
    //make li's text be the item from the array
    taskli.innerText = taskitem;
    //add a checkbox to every li
    taskli.appendChild(checkbox);

    taskli.appendChild(deletebutton);

    //add li to ul
    taskList.appendChild(taskli);
  });

  stringifiedtasksArray = JSON.stringify(tasksArray);
  localStorage.setItem("tasks", stringifiedtasksArray);
}
//Adding a event listener to the button, this way i can listen to certain actions performed to my button.
//Using click event listener here, takes 2 args, type of event, and function to run
//dont use the addTask() as it calls the function instantly use addTask and let the eventlistener trigger the function itself
addButton.addEventListener("click", addTask);

/*
function addTask() {
  //.innerHTML += takes that string and converts it to real HTML elements
  let taskToAdd = document.getElementById("taskaddinput").value;
  //creating input in function to add to the task, set input to checkbox and add eventlistener to each created checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  //adding "anonymous function inside the event listener, simpler way to handle scope at this moment; passing event into the function as a param to use event.target to target the clicked checkbox
    checkbox.addEventListener("change", function (event) {
      let selectedCheckbox = event.target;
    //storing the actual list item that is parent of the selected checkbox
      let parentlist = selectedCheckbox.parentElement;
      if (selectedCheckbox.checked) {
      //adding specific completedTask to list if checked or removed if off to edit styling
      parentlist.classList.add("completedTask");
    }  else {
       parentlist.classList.remove("completedTask");
    }
    });

  //check to avoid adding empty tasks
  if (taskToAdd != "") {
    //taskList.innerHTML += `<li>${taskToAdd}</li>`;
    //innerHTML replaces entire HTML item, instead recommended to create a new element
    // and append to current list - does not interfere with future event listeners
    let taskli = document.createElement("li");
    taskli.innerText = taskToAdd;
    taskli.appendChild(checkbox);
    taskList.appendChild(taskli);
    //set the input box to empty after adding task
    document.getElementById("taskaddinput").value = "";
  }
}
*/

//
