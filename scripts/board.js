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
    document.getElementById(elementId).innerHTML += taskCardTemplate(tasks[i], statusId);
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

/**
 * Checks if any of the board fields are empty after filtering.
 * If a board field is empty, it displays a placeholder message.
 * @returns {void}
 */
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
function renderTaskOverlayContent(addTaskStatus) {
  createdTasksStatus = addTaskStatus;
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayContentRef.innerHTML = addTaskOverlayBoardTemplate();
  toggleSubtasks();
  renderAssignedContacts();
  renderContactsDropdown();
  openAddTaskOverlay();
  resizeAndPositionOverlay();
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



function openDragMenu(event, id, statusId) {
  event.stopPropagation();
  taskStatus.splice(statusId, 1);
  let dragMenu = document.getElementById(`drag-menu-${id}`);
  dragMenu.innerHTML = dragMenuTemplate(id, taskStatus);
  dragMenu.style.display = 'block';
}

function closeDragMenu(event) {
  event.stopPropagation();
  let dragmenus = document.getElementsByClassName('drag-menu');
  let moveToMenus = document.getElementsByClassName('move-to');
  for (let index = 0; index < dragmenus.length; index++) {
    if (event.target !== dragmenus[index] || event.target !== moveToMenus[index]) {
      dragmenus[index].style.display = 'none';
    }
  }
}

/**
 * Bewegt einen Task in eine andere Statusspalte via Klick (für mobile Ansicht)
 * @param {string} status - Der Zielstatus des Tasks (toDo, inProgress, awaitFeedback, done)
 * @param {number} id - Die ID des zu bewegenden Tasks
 */
async function moveTaskTo(event, status, id) {
  event.stopPropagation();
  let taskToMove = createdTasks.find(task => task.id === id);
  if (taskToMove) {
    taskToMove.status = status;
    let dragMenu = document.getElementById(`drag-menu-${id}`);
    if (dragMenu) {
      dragMenu.style.display = 'none';
    }
    await putTasks();
    await boardInit();
    showMoveNotification(status);
  }
}

/**
 * Zeigt eine kleine Benachrichtigung an, wenn ein Task verschoben wurde
 * @param {string} status - Der Zielstatus, in den der Task verschoben wurde
 */
let statusNames = {
  'toDo': 'To do',
  'inProgress': 'In progress',
  'awaitFeedback': 'Await feedback',
  'done': 'Done'
};

function showMoveNotification(status) {
  let displayStatus = statusNames[status] || status;
  let notification = document.createElement('div');
  notification.className = 'move-notification';
  notification.innerHTML = `Task moved to <strong>${displayStatus}</strong>`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}
// Optionaler notificationstext

// function dragMenuTemplate(id, taskStatus) {
//   return `<div class="move-to">
//                   <p>Move to</p>
//                   <div class="option" onclick="moveTaskTo('toDo', ${id})">
//                       <img src="./assets/img/arrow_upward.png" alt="Up Arrow">
//                       <span>${taskStatus[0]}</span>
//                   </div>
//                   <div class="option" onclick="moveTaskTo('inProgress', ${id})">
//                       <img src="./assets/img/arrow_downward.png" alt="Down Arrow">
//                       <span>${taskStatus[1]}</span>
//                   </div>
//                   <div class="option" onclick="moveTaskTo('awaitFeedback', ${id})">
//                       <img src="./assets/img/arrow_downward.png" alt="Down Arrow">
//                       <span>${taskStatus[2]}</span>
//                   </div>
//               </div>`;
// }

// let allStatusOptions = [
//   { id: 'toDo', label: 'To do', icon: 'arrow_upward.png' },
//   { id: 'inProgress', label: 'In progress', icon: 'arrow_downward.png' },
//   { id: 'awaitFeedback', label: 'Await feedback', icon: 'arrow_downward.png' },
//   { id: 'done', label: 'Done', icon: 'arrow_downward.png' }
// ];

// function findTaskById(id) {
//   let taskToMove;
//   for (let i = 0; i < createdTasks.length; i++) {
//     if (createdTasks[i].id === id) {
//       taskToMove = createdTasks[i];
//       break;
//     }
//   }
//   return taskToMove;
// }

// function dragMenuTemplate(id, statusId) {
//   let taskToMove = findTaskById(id);
//   let currentStatus = taskToMove.status; 
//   let optionsHTML = '';
//   for (let i = 0; i < allStatusOptions.length; i++) {
//     let option = allStatusOptions[i];  
//     if (option.id !== currentStatus) {
//       optionsHTML += `
//         <div class="option" onclick="moveTaskTo('${option.id}', ${id})">
//           <img src="./assets/img/${option.icon}" alt="${option.label}">
//           <span>${option.label}</span>
//         </div>
//       `;
//     }
//   }
//   return `
//     <div class="move-to">
//       <p>Move to</p>
//       ${optionsHTML}
//     </div>
//   `;
// }

 function findTaskById(id) {
   let taskToMove;
   for (let i = 0; i < createdTasks.length; i++) {
     if (createdTasks[i].id === id) {
       taskToMove = createdTasks[i];
       break;
     }
   }
   return taskToMove;
 }

 let allStatusOptions = [
   { id: 'toDo', label: 'To do', icon: 'arrow_upward.png' },
   { id: 'inProgress', label: 'In progress', icon: 'arrow_downward.png' },
   { id: 'awaitFeedback', label: 'Await feedback', icon: 'arrow_downward.png' },
   { id: 'done', label: 'Done', icon: 'arrow_downward.png' }
 ];

function getDirectionIcon(currentStatus, targetStatus) {
  let statusOrder = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
  let currentIndex = statusOrder.indexOf(currentStatus);
  let targetIndex = statusOrder.indexOf(targetStatus);
  if (targetIndex < currentIndex) {
    return 'arrow_upward.png';
  } 
  else {
    return 'arrow_downward.png';
  }
}

/**
 * Generiert das HTML-Template für das Drag-Menü mit korrekten Pfeilrichtungen
 * @param {number} id - Die ID des Tasks
 * @returns {string} HTML-Template für das Drag-Menü
 */
function dragMenuTemplate(id) {
  let taskToMove = findTaskById(id);
  if (!taskToMove) {
    return '<div class="move-to"><p>Move to</p><p>No options available</p></div>';
  }
  let currentStatus = taskToMove.status;
  let optionsHTML = '';
  for (let i = 0; i < allStatusOptions.length; i++) {
    let option = allStatusOptions[i]; 
    if (option.id !== currentStatus) {
      let arrowIcon = getDirectionIcon(currentStatus, option.id);
      optionsHTML += `
        <div class="option" onclick="moveTaskTo(event, '${option.id}', ${id})">
          <img src="./assets/img/${arrowIcon}" alt="${option.label}">
          <span>${option.label}</span>
        </div>
      `;
    }
  }
  return `
    <div onclick="closeDragMenu(event)" class="move-to">
      <p>Move to</p>
      ${optionsHTML}
    </div>
  `;
}