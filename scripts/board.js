let taskStatus = ["to do", "in progress", "await feedback", "done"];
let currentDragedElement = null;
let cardIndex = 0;
let editedSelectedContacts = [];

/**
 * Initializes the board by rendering user information, fetching tasks and contacts,
 * updating the HTML, and setting up event handlers based on screen size.
 * @async
 * @returns {Promise<void>}
 */
async function boardInit() {
  renderUserIconName();
  await getTasks();
  await getContacts();
  updateHTML();
}

/**
 * Renders all tasks on the board based on their status and updates related UI elements.
 */
function updateHTML() {
  renderTasks("toDo", "toDo", 0);
  renderTasks("inProgress", "inProgress", 1);
  renderTasks("awaitFeedback", "awaitFeedback", 2);
  renderTasks("done", "done", 3);
  hideSubtasksIfEmpty();
  breakDescriptions();
  cardIndex = 0;
}

/**
 * Renders tasks with a specific status into the corresponding board column.
 * @param {string} status - The status of tasks to render ("toDo", "inProgress", "awaitFeedback", "done").
 * @param {string} elementId - The ID of the container element where tasks should be rendered.
 */
function renderTasks(status, elementId, statusId) {
  let tasks = createdTasks.filter((task) => task.status === status);
  document.getElementById(elementId).innerHTML = "";
  if (tasks.length === 0) {
    document.getElementById(elementId).innerHTML += noTasksTemplate(statusId);
  }
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById(elementId).innerHTML += taskCardTemplate(tasks[i]);
    showAssignedContactsOnBoardCard(tasks, i);

    cardIndex++;
  }
}

/**
 * Renders assigned contacts on a board card
 * @param {Array<Object>} tasks - An array of task objects
 * @param {number} i - The index of the task in the array
 * If the task has more than 5 contacts, it will show the first 5 contacts and add a label with the number of remaining contacts
 */
function showAssignedContactsOnBoardCard(tasks, i) {
  if (tasks[i].selectedContacts.length > 5) {
    for (let index = 0; index < 5; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === tasks[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += `<span style="transform: translateX(-24px)";>+${tasks[i].selectedContacts.length - 5}</span>`
  } else {
    for (let index = 0; index < tasks[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === tasks[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
  }

}

/**
 * Hides subtask elements for tasks that have no subtasks.
 */
function hideSubtasksIfEmpty() {
  let subtasksRef = document.getElementsByClassName("board-card-subtasks");
  for (let i = 0; i < subtasksRef.length; i++) {
    if (subtasksRef[i].children[1].textContent === "0/0 Subtasks") {
      subtasksRef[i].style.display = "none";
    }
  }
}

/**
 * Truncates long task descriptions with ellipses to maintain UI consistency.
 */
function breakDescriptions() {
  let descriptionContainers = document.getElementsByClassName("board-card-description");
  for (let i = 0; i < descriptionContainers.length; i++) {
    let description = descriptionContainers[i].querySelector("p").textContent;
    description = description.slice(0, 38) + "...";
    descriptionContainers[i].textContent = description;
  }
}

/**
 * Allows dropping of dragged elements by preventing the default behavior.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Starts the drag operation and sets the currently dragged element.
 * @param {number|string} id - The ID of the task being dragged.
 */
function startDrag(id) {
  currentDragedElement = id;
}

/**
 * Handles the drop operation for dragged tasks, updating their status and refreshing the UI.
 * @async
 * @param {string} status - The new status to assign to the dropped task.
 * @returns {Promise<void>}
 */
async function drop(status) {
  if (currentDragedElement !== null) {
    let task = createdTasks.find((task) => task.id === currentDragedElement);
    task.status = status;
    await putTasks();
    await boardInit();
  }
  currentDragedElement = null;
}

/**
 * Filters and displays task cards on the board based on user input.
 * Hides all board cards initially and then selectively shows cards
 * whose titles include the search input text, ignoring case.
 */
function searchTask() {
  updateHTML();
  let searchInput = document.getElementById("findTaskInput").value.toLowerCase();
  let boardCards = Array.from(document.getElementsByClassName("board-card"));
  boardCards.forEach((div) => {
    div.classList.add("d-none");
  });
  let filteredCards = boardCards.filter((div) =>
    div.querySelector("h3")?.textContent.toLowerCase().trim().includes(searchInput)
  );
  filteredCards.forEach((div) => {
    div.classList.remove("d-none");
  });
  checkIfBoardFieldIsEmpty();
}

function checkIfBoardFieldIsEmpty() {
  let boardFields = document.getElementsByClassName("board-field");
  console.log(boardFields);
  for (let i = 0; i < boardFields.length; i++) {
      if ([...boardFields[i].children].every(child => child.classList.contains("d-none"))) {
        boardFields[i].innerHTML = noTasksTemplate(i)
      }
  }
}

/**
 * Opens the add task overlay with animation and prepares its content.
 */
function openAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  // renderTaskOverlayContent(); 
  addTaskOverlayRef.classList.remove("d-none");
  addTaskOverlayRef.style.pointerEvents = "all";
  setTimeout(() => {
    addTaskOverlayRef.classList.add("active");
    addTaskOverlayContentRef.classList.add("overlay-position");
  }, 50);
  changeMediumBtn();
}

/**
 * Renders the content of the task overlay and initializes related UI elements.
 */
function renderTaskOverlayContent() {
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayContentRef.innerHTML = addTaskOverlayBoardTemplate();
  toggleSubtasks();
  renderAssignedContacts();
  renderContactsDropdown();
  openAddTaskOverlay();
}

/**
 * Renders the contacts dropdown menu with all available contacts.
 */
function renderContactsDropdown() {
  let dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.innerHTML = contacts.map(contact => `<div onclick="selectContact('${contact.name}')">${contact.name}</div>`).join('');
}

/**
 * Closes the add task overlay with animation and resets related variables.
 */
function closeAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayRef.classList.remove("active");
  addTaskOverlayContentRef.classList.remove("overlay-position");
  addTaskOverlayRef.style.pointerEvents = "none";
  editedSelectedContacts = [];
  selectedContacts = [];
  setTimeout(() => {
    addTaskOverlayRef.classList.add("d-none");
    addTaskOverlayContentRef.innerHTML = "";
  }, 400);
}

/**
 * Closes the add task overlay if the user clicks outside of it.
 * @param {Event} event - The click event that triggered this function.
 */
function closeOverlayOutside(event) {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  if (event.target == addTaskOverlayRef) {
    addTaskOverlayRef.classList.remove("active");
    addTaskOverlayRef.style.pointerEvents = "none";
    addTaskOverlayContentRef.classList.remove("overlay-position");
    editedSelectedContacts = [];
    selectedContacts = [];
    setTimeout(() => {
      addTaskOverlayRef.classList.add("d-none");
      addTaskOverlayContentRef.innerHTML = "";
    }, 400);
  }
}

function validateEditInputs() {
  let requiredTexts = document.querySelectorAll(".required-text span");
  let titleInput = document.querySelector(".addTask-title input");
  let dateInput = document.querySelector(".task-date input");
  let editTaskButton = document.getElementById("confirmTaskChanges");
  editTaskButton.disabled = titleInput.value.trim() === "" || dateInput.value.trim() === "";
  for (let index = 0; index < requiredTexts.length; index++) {
    if (!requiredTexts[index].classList.contains("d-none")) {
      editTaskButton.disabled = true;
    }
  }
}

/**
 * Applies changes to a task and updates the data on the server.
 * @async
 * @param {string} currentTitle - The current title of the task being edited.
 * @returns {Promise<void>}
 */
async function confirmTaskChanges(currentTitle) {
  getTaskOverlayInputs();
  let id = 0;
  id = checkTaskId(id);
  let taskToEdit = createdTasks.find((task) => task.title == currentTitle);
  let taskIndex = createdTasks.indexOf(taskToEdit);
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  taskToEdit.completedSubtasks = taskToEdit.completedSubtasks.filter(subtask =>
    selectedSubtasks.includes(subtask)
  );
  let editedTask = createEditTask(id, taskToEdit);
  createdTasks[taskIndex] = editedTask;
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  await boardInit();
  closeTaskCardOverlay();
}

function createEditTask(id, taskToEdit) {
  return {
    "id": id, "status": taskToEdit.status, "title": title,
    "description": description,
    "selectedContacts": editedSelectedContacts.length > 0 ? editedSelectedContacts : selectedContacts,
    "dueDate": dueDate, "priority": priority, "selectedCategory": taskToEdit.selectedCategory,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": taskToEdit.completedSubtasks.length > 0 ? taskToEdit.completedSubtasks : [""]
  };
}

/**
 * Retrieves input values from the task overlay form elements.
 */
function getTaskOverlayInputs() {
  title = document.querySelector(".addTask-title input").value;
  description = document.querySelector(".addTask-description textarea").value;
  dueDate = document.querySelector(".task-date input").value;
  items = Array.from(document.getElementsByClassName("subtask-item"));
}

/**
 * Clears all input fields in the add task form and resets their required attribute.
 */
function clearInputFields() {
  let inputFieldsRef = Array.from(document.getElementsByClassName("add-task-input-field"));
  inputFieldsRef.forEach((inputField) => {
    inputField.value = "";
    inputField.setAttribute("required", "false");
  });
  changeMediumBtn();
  editedSelectedContacts = [];
}

/**
 * Displays a notification after a task has been added and clears input fields.
 */
function showTaskNotification() {
  let notification = document.querySelector(".click-notification-add-task");
  if (notification) {
    clearInputFields();
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
}
