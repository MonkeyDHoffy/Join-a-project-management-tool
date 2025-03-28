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
    selectedSubtasks.push(item.innerText);
  });
  let newTask = createNewTask(id);
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  showTaskNotification();
}

/**
 * Creates a new task object with the given ID and input values.
 * Sets default status to "toDo" and includes input values for title, description, contacts, due date, priority, category, and subtasks.
 * Ensures that selected contacts and subtasks are set to empty arrays if none are provided.
 * @param {number} id - The unique identifier for the new task.
 * @returns {Object} The task object with all necessary properties.
 */

function createNewTask(id) {
  return {
    "id": id, "status": "toDo", "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
}

/**
 * Checks if a given task ID is already in use and increments it if it is.
 * @param {number} id - The task ID to check
 * @returns {number} The checked task ID, incremented if it was already in use
 */
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
    selectedSubtasks.push(item.innerText);
  });
  let newTask = createNewTaskOverlay(id);
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  editedSelectedContacts = [];
  await putTasks();
  showTaskNotificationOverlayAddTask();
}

/**
 * Creates a new task object from form inputs to be added to the task list and saved to storage.
 * If no status is provided, the task is set to "toDo" status.
 * @param {number} id - The unique identifier of the new task
 * @returns {Object} A task object with all required properties
 */
function createNewTaskOverlay(id) {
  return {
    "id": id, "status": createdTasksStatus == undefined || "" ? "toDo" : createdTasksStatus, "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
}
