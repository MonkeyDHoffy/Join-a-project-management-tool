let taskStatus = ["to do", "in-progress", "await feedback", "done"];
let currentDragedElement = null;
let cardIndex = 0;

async function boardInit() {
  await getTasks();
  await getContacts();
  updateHTML();
}

//-- render all tasks on the board
function updateHTML() {
  renderTasks("toDo", "toDo");
  renderTasks("inProgress", "inProgress");
  renderTasks("awaitFeedback", "awaitFeedback");
  renderTasks("done", "done");
  cardIndex = 0;
}

function renderTasks(status, elementId) {
  let tasks = createdTasks.filter((task) => task.status === status);
  document.getElementById(elementId).innerHTML = "";
  if (tasks.length === 0) {
    document.getElementById(elementId).innerHTML += noTasksTemplate(taskStatus.indexOf(status));
  }
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById(elementId).innerHTML += taskCardTemplate(tasks[i]);
    for (let index = 0; index < tasks[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === tasks[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function hideSubtasksIfEmpty() {
  let subtasksRef = document.getElementsByClassName("board-card-subtasks");
  for (let i = 0; i < subtasksRef.length; i++) {
    if (subtasksRef[i].children[1].textContent === "0/0 Subtasks") {
      subtasksRef[i].style.display = "none";
    }
  }
}

//-- drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function startDrag(id) {
  currentDragedElement = id;
}

async function drop(status) {
  if (currentDragedElement !== null) {
    let task = createdTasks.find((task) => task.id === currentDragedElement);
    task.status = status;
    createdTasks.forEach((task) => {
      if (task.selectedContacts.length == 0) {
        task.selectedContacts = [""];
      }
      if (task.completedSubtasks.length == 0) {
        task.completedSubtasks = [""];
      }
      if (task.subtasks.length == 0) {
        task.subtasks = [""];
      }
    });
    await putData("tasks", createdTasks);
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
  let searchInput = document
    .getElementById("findTaskInput")
    .value.toLowerCase();
  let boardCards = Array.from(document.getElementsByClassName("board-card"));
  boardCards.forEach((div) => {
    div.style.display = "none";
  });
  let filteredCards = boardCards.filter((div) =>
    div
      .querySelector("h3")
      ?.textContent.toLowerCase()
      .trim()
      .includes(searchInput)
  );
  filteredCards.forEach((div) => {
    div.style.display = "block";
  });
}

//-- add task overlay
function openAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayRef.classList.remove("d-none");
  addTaskOverlayRef.style.pointerEvents = "all";
  setTimeout(() => {
    addTaskOverlayRef.classList.add("active");
    addTaskOverlayContentRef.style.left = "calc(50% - 482px)";
  }, 50);
  changeMediumBtn();
}

/**
 * Closes the add task overlay.
 * Removes the active class, sets the content to move out of view to the right, and sets the pointer events to none.
 * Then, after a delay of 400ms, adds the d-none class to hide the overlay.
 */
function closeAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById(
    "addTaskOverlayContent"
  );
  addTaskOverlayRef.classList.remove("active");
  addTaskOverlayContentRef.style.left = "100%";
  addTaskOverlayRef.style.pointerEvents = "none";
  setTimeout(() => {
    addTaskOverlayRef.classList.add("d-none");
  }, 400);
}

/**
 * Closes the add task overlay if the user clicks outside of it.
 * @param {Event} event - The event that triggered this function.
 */
function closeOverlayOutside(event) {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById(
    "addTaskOverlayContent"
  );
  if (event.target == addTaskOverlayRef) {
    addTaskOverlayRef.classList.remove("active");
    addTaskOverlayRef.style.pointerEvents = "none";
    addTaskOverlayContentRef.style.left = "100%";
    setTimeout(() => {
      addTaskOverlayRef.classList.add("d-none");
    }, 400);
  }
}

/**
 * Clears the values of all input fields with the class "add-task-input-field".
 * Sets their "required" attribute to "false".
 * Invokes the changeMediumBtn function after clearing the inputs.
 */

function clearInputFields() {
  let inputFieldsRef = Array.from(
    document.getElementsByClassName("add-task-input-field")
  );
  inputFieldsRef.forEach((inputField) => {
    inputField.value = "";
    inputField.setAttribute("required", "false");
  });
  changeMediumBtn();
}

/**
 * Shows the notification for adding a task and clears all input fields.
 * The notification is removed after 2000ms.
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
