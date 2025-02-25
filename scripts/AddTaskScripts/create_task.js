
let selectedSubtasks = [];

async function init() {
  addTaskInit(); 
  getAssignedContacts(); 
  renderAssignedContacts();
  await getTasks();
}

function createTask() {
  let title = document.querySelector(".addTask-title input").value;
  let description = document.querySelector(".addTask-description textarea").value;
  let dueDate = document.querySelector(".task-date input").value;
  let category = document.getElementById("category-field").value;
  let items = Array.from(document.getElementsByClassName("subtask-item"));
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    "id": createdTasks.length + 1,
    "status": "toDo",
    "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate,
    "priority": priority,
    "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""]
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  fetchtasks();
  showTaskNotification();
}

async function fetchtasks() {
  putData("tasks", createdTasks);
}
