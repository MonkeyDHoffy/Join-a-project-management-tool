let taskStatus = ["to do", "in-progress", "await feedback", "done"];
let currentDragedElement = null;
let cardIndex = 0;

async function boardInit() {
  await getTasks();
  await getContacts();
  createdTasks.forEach((task) => {
    if (task.selectedContacts[0] === "") {
      task.selectedContacts = [];
    }
    if (task.completedSubtasks[0] === "") {
      task.completedSubtasks = [];
    }
    if (task.subtasks[0] === "") {
      task.subtasks = [];
    }
  });
  updateHTML();
}

//-- render all tasks on the board
function updateHTML() {
  renderToDo();
  renderInProgress();
  renderAwaitFeedback();
  renderDone();
  hideNoSubtasks();
  cardIndex = 0;
}

function renderToDo() {
  let toDo = createdTasks.filter((task) => task.status === "toDo");
  document.getElementById("toDo").innerHTML = "";
  if (toDo.length === 0) {
    document.getElementById("toDo").innerHTML += noTasksTemplate(0);
  }
  for (let i = 0; i < toDo.length; i++) {
    document.getElementById("toDo").innerHTML += taskCardTemplate(toDo[i]);
    for (let index = 0; index < toDo[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === toDo[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function renderInProgress() {
  let inProgress = createdTasks.filter((task) => task.status === "inProgress");
  document.getElementById("inProgress").innerHTML = "";
  if (inProgress.length === 0) {
    document.getElementById("inProgress").innerHTML += noTasksTemplate(1);
  }
  for (let i = 0; i < inProgress.length; i++) {
    document.getElementById("inProgress").innerHTML += taskCardTemplate(
      inProgress[i]
    );
    for (let index = 0; index < inProgress[i].selectedContacts.length; index++ ) {
      let assignedContact = contacts.find(
        (contact) => contact.name === inProgress[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function renderAwaitFeedback() {
  let awaitFeedback = createdTasks.filter(
    (task) => task.status === "awaitFeedback"
  );
  document.getElementById("awaitFeedback").innerHTML = "";
  if (awaitFeedback.length === 0) {
    document.getElementById("awaitFeedback").innerHTML += noTasksTemplate(2);
  }
  for (let i = 0; i < awaitFeedback.length; i++) {
    document.getElementById("awaitFeedback").innerHTML += taskCardTemplate(
      awaitFeedback[i]
    );
    for (let index = 0; index < awaitFeedback[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === awaitFeedback[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function renderDone() {
  let done = createdTasks.filter((task) => task.status === "done");
  document.getElementById("done").innerHTML = "";
  if (done.length === 0) {
    document.getElementById("done").innerHTML += noTasksTemplate(3);
  }
  for (let i = 0; i < done.length; i++) {
    document.getElementById("done").innerHTML += taskCardTemplate(done[i]);
    for (let index = 0; index < done[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === done[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function hideNoSubtasks() {
  let subtasksRef = Array.from(document.getElementsByClassName("board-card-subtasks"));
  for (let index = 0; index < subtasksRef.length; index++) {
    if (subtasksRef[index].children[1].textContent === "0/0 Subtasks") {
      subtasksRef[index].style.display = "none";
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
  let addTaskOverlayContentRef = document.getElementById(
    "addTaskOverlayContent"
  );
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
