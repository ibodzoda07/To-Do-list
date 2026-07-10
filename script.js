const menuButton = document.getElementById("menu-button");
const sidebar = document.querySelector(".sidebar");

const menuTasks = document.querySelector(".menu-tasks");
const userInfo = document.querySelector(".user-info");

// main

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

// Filters (Фильтры)

const noTasksMessage = document.getElementsByClassName("no-tasks");
const allTasks = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const tasksLeft = document.getElementById("tasks-left");

// Tasks Container
const taskContainer = document.querySelector(".task-container");
const checkboxes = document.getElementById("checkbox");
const taskList = document.getElementsByClassName("task-list");
const taskText = document.getElementById("task-text");



let tasks = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Bake a cake", completed: true }
];

tasks.forEach(task => {
    taskContainer.appendChild(createTaskElement(task.text));
});

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("colapse");
});

addTaskBtn.addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {  
        taskContainer.appendChild(createTaskElement(taskText));
        taskInput.value = ""; 
    }
    else {
        alert("Пожалуйста, введите задачу.");
    }
});

function createTaskElement(taskText) {
    const taskItem = document.createElement("div");
    taskItem.className = "tasks-list";
    taskItem.innerHTML = `
        <input type="checkbox" id="checkbox">
        <span id="task-text">${taskText}</span>
        <div class="task-actions">
            <button type="button" class="action-btn">
                <img class="edit" src="/assets/pencil 1.png" alt="Edit">
            </button>
            <button type="button" class="action-btn">
                <img class="trash" src="/assets/trash 1.png" alt="Delete">
            </button>
        </div>
    `;

    tasks.push({ id: tasks.length + 1, text: taskText, completed: false });
    return taskItem;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    preventDefault();
}






