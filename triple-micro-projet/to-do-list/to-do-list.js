class Task {
    constructor(taskText) {
        this.taskText = taskText;
        this.createTaskElement();
    }

    createTaskElement() {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskDiv.remove();
            }
        });

        const taskText = document.createElement("span");
        taskText.textContent = this.taskText;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);

        document.getElementById("tasklist").appendChild(taskDiv);
    }
}

function addTask() {
    const taskInput = document.getElementById("taskvalue");
    const taskText = taskInput.value.trim(); 

    if (taskText !== "") {
        new Task(taskText); 
        taskInput.value = ""; 
    }
}

document.getElementById("newtask").addEventListener("click", addTask);