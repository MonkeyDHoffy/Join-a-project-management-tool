let title;
let description;
let dueDate;
let category;
let items;
let createdTasksStatus = "";
let completedItems = [];
let completedSubtasks = [];
let selectedSubtasks = [];

/**
 * Initializes the task creation process by getting assigned contacts and rendering them, then loading existing tasks.
 * @async
 * @returns {Promise<void>} A promise that resolves when tasks are loaded
 */
async function createTaskInit() {
  getAssignedContacts();
  renderAssignedContacts();
  await getTasks();
}

/**
 * Collects all the input values from the task creation form fields and assigns them to global variables.
 * @returns {void}
 */
function getTaskInputs() {
  title = document.querySelector(".addTask-title input").value;
  description = document.querySelector(".addTask-description textarea").value;
  dueDate = document.querySelector(".task-date input").value;
  category = document.getElementById("category-field").value;
  items = Array.from(document.getElementsByClassName("subtask-item"));
}

/**
 * Creates a new task with the collected input values and adds it to the task list, then saves it to storage.
 * Clears selected subtasks and contacts after creating the task.
 * @async
 * @returns {Promise<void>} A promise that resolves when the task is saved
 */
async function createTask() {
  getTaskInputs();
  let id = 0;
  id = checkTaskId(id);
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    "id": id, "status": createdTasksStatus == "" ? "toDo" : createdTasksStatus, "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  showTaskNotification();
}

function checkTaskId(id) {
  for (let index = 0; index <= createdTasks.length; index++) {
    createdTasks.forEach((task) => {
      if (id == task.id) {
        id++;
      }
    })
  }
  return id;
}

/**
 * Creates a new task from an overlay form, adds it to the task list, and saves it to storage.
 * Displays a specific notification for task creation from overlay.
 * Clears selected subtasks and contacts after creating the task.
 * @async
 * @returns {Promise<void>} A promise that resolves when the task is saved
 */
async function createTaskOverlay() {
  getTaskInputs();
  let id = 0;
  id = checkTaskId(id);
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    "id": createdTasks.length + 1, "status": createdTasksStatus == "" ? "toDo" : createdTasksStatus, "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  editedSelectedContacts = [];
  await putTasks();
  showTaskNotificationOverlayAddTask();
}
