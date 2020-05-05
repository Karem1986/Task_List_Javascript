//Define our UI variables
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearnBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput =document.querySelector('#task');

//load all event listeners

loadEventListeners();

//load all event listeners

function loadEventListeners() {
    //DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task evennt
    //Remove task event
tasklist.addEventListener('click', removeTask);
//Clear task event 
//Clear task event
clearnBtn.addEventListener('click', clearTasks);
//Filter tasks events
filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS 
function getTasks() {
let tasks;
if(localStorage.getItem('tasks') === null) {
    tasks = [];
    } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
       //Create li element
const li = document.createElement('li');
//add class
li.className ='collection-item';
//create text node and append to the li
li.appendChild(document.createTextNode(task));
//create new link element 
const link = document.createElement('a')
//add class
link.className = 'delete-item secondary-content';
//add icon html
link.innerHTML = '<i class = "fa fa-remove"></i>';

//Append link to the li 
li.appendChild(link); 

//Append li to ul 
tasklist.appendChild(li);

  });
}


//Add task
function addTask(e) {
if(taskInput.value === '') {
    alert('Add a task');

}

//Create li element
const li = document.createElement('li');
//add class
li.className ='collection-item';
//create text node and append to the li
li.appendChild(document.createTextNode(taskInput.value));
//create new link element 
const link = document.createElement('a')
//add class
link.className = 'delete-item secondary-content';
//add icon html
link.innerHTML = '<i class = "fa fa-remove"></i>';

//Append link to the li 
li.appendChild(link);


//Store in LS 
storeTaskInLocalStorage(taskInput.value);


//Append li to ul 
tasklist.appendChild(li);

//console.log(li);
//Clear input 
taskInput.value = '';

    e.preventDefault();
}

//Store Task 
function storeTaskInLocalStorage(task) {
let tasks;
if(localStorage.getItem('tasks') === null) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

 tasks.push(task);

 localStorage.setItem('tasks', JSON.stringify(tasks));

}



//NEXT: enable delete task and filter through task (see above the event listeners)

//Remove task
function removeTask(e) {
   if(e.target.parentElement.classList.contains
    ('delete-item')) {
   if(confirm('Are You Sure?')) {
    e.target.parentElement.parentElement.remove();
   //Remove from LS
     removeTaskFromLocalStorage
       (e.target.parentElement.parentElement);

    
   }
}

}

//Remove from Local Storage 
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
          tasks.splice(index, 1);

        }


    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Clear Tasks

function clearTasks() {
    //tasklist.innerHTML = '';

    //Faster way 
     while(tasklist.firstChild) {
     tasklist.removeChild(tasklist.firstChild);

    }
}
//Filter Tasks 

function filterTasks(e) {
const text = e.target.value.toLowerCase();

//console.log(text);

document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) { 
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
});
}