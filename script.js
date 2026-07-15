const menuButton = document.getElementById("menu-button");
const sidebar = document.querySelector(".sidebar");
// Main

const taskForm= document.querySelector(".search-form")
const taskInput = document.getElementById("task-input");
const themeToggleBtn = document.querySelector(".togle_theme");
const tasksLeft = document.querySelector(".tasks-left");

// Tasks Container
const checkbox = document.getElementById("checkbox");
const taskContainer = document.getElementById("tasks-wrapper");
const editBtn = document.querySelector(".edit");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

themeToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
});

let currentFilter = "all";
renderTasks()
checkEmptyList();

document.getElementById("all").addEventListener("click", (e) => {
    currentFilter = "all";
    document.querySelectorAll(".todo-list li").forEach(li => li.classList.remove("active-filter"));
    e.target.classList.add("active-filter");
    renderTasks();
});

document.getElementById("active").addEventListener("click", (e) => {
    currentFilter = "active";
    document.querySelectorAll(".todo-list li").forEach(li => li.classList.remove("active-filter"));
    e.target.classList.add("active-filter");
    renderTasks();
});

document.getElementById("completed").addEventListener("click", (e) => {
    currentFilter = "completed";
    document.querySelectorAll(".todo-list li").forEach(li => li.classList.remove("active-filter"));
    e.target.classList.add("active-filter");
    renderTasks();
});

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("colapse");
});


function createTaskElement(tasks) {
    const taskItem = document.createElement("div");
    const textClass = tasks.completed ? "completed-text" : "";
    const isChecked = tasks.completed ? "checked" : "";

    taskItem.className = "tasks-list";
    taskItem.dataset.id = tasks.id;
    taskItem.innerHTML = `
        <input type="checkbox" id="checkbox" ${isChecked}>
        <span id="task-text" class="${textClass}"> ${tasks.text}</span>
        <div class="task-actions">
            <button type="button" class="action-btn">
                <img class="edit" src="/assets/pencil 1.png" alt="Edit">
            </button>
            <button type="button" class="action-btn">
                <img class="trash" src="/assets/trash 1.png" alt="Delete">
            </button>
        </div>
    `;

    return taskItem;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    checkEmptyList();
    renderTasks();
    preventDefault();
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const taskText = taskInput.value.trim();

    if (taskText !== "") {  
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskContainer.appendChild(createTaskElement(newTask));
        taskInput.value = ""; 
        renderTasks();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log (newTask)
    }
    else {
        alert("Пожалуйста, введите задачу.");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

taskContainer.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("trash")) {
        const taskElement = e.target.closest(".tasks-list");
        const taskId = Number(taskElement.dataset.id);
    
        if (taskElement) {
            const textToFind = taskElement.querySelector("#task-text").textContent.trim();
            tasks = tasks.filter(task => task.id !== taskId);
            taskElement.remove();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            checkEmptyList();
        }
    }

    if (e.target.classList.contains("edit")) {
        const taskElement = e.target.closest(".tasks-list");
    
        if (taskElement) {
            const textSpan = taskElement.querySelector("#task-text");
            const oldText = textSpan.textContent.trim();
            const newText = prompt("Редактировать задачу:", oldText);
            
            if (newText && newText.trim() !== "") {
                
                const taskObj = tasks.find(task => task.text === oldText);

                if (taskObj) {
                    taskObj.text = newText.trim();

                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    
                    textSpan.textContent = newText.trim();
                }
            }
        }
    }

    if (e.target.id === "checkbox") {
        const taskElement = e.target.closest(".tasks-list"); 
                
        if (taskElement) {
            const taskId = Number(taskElement.dataset.id);
            const textSpan = taskElement.querySelector("#task-text");
            const taskObj = tasks.find(task => task.id === taskId);

            if (taskObj) {
                taskObj.completed = e.target.checked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                textSpan.classList.toggle("completed-text", taskObj.completed);
            }
        }
    }renderTasks();
});

function checkEmptyList() {
    const noTasksBlock = document.querySelector(".no-tasks");
    const taskContainerBlock = document.querySelector(".task-container"); 

    if (!noTasksBlock || !taskContainerBlock) return;

    if (tasks.length === 0) {
        noTasksBlock.classList.remove("hidden");      
        taskContainerBlock.classList.add("hidden");
    } else {
        noTasksBlock.classList.add("hidden"); 
        taskContainerBlock.classList.remove("hidden");
    }
}

function renderTasks() {
    taskContainer.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        taskContainer.appendChild(createTaskElement(task));
    });

    const activeTasksCount = tasks.filter(task => !task.completed).length;
    if (tasksLeft) {
        tasksLeft.textContent = `${activeTasksCount} task left`;
    }

    checkEmptyList();
}