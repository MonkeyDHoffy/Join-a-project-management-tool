/**
 * Toggles the completion status of a subtask and updates the task data
 * @param {string} subtask - The subtask text to toggle
 * @param {HTMLElement} element - The HTML element that triggered the toggle
 * @async
 */
async function toggleSubtaskCompleted(subtask, element) {
  let task = createdTasks.find((task) => task.subtasks.includes(subtask));
  if (!task.completedSubtasks.includes(subtask)) {
    task.completedSubtasks.push(subtask);
  } else {
    task.completedSubtasks.splice(task.completedSubtasks.indexOf(subtask), 1);
  }
  await putTasks();
  await boardInit();
}

/**
 * Displays the task card overlay with all task details
 * @param {HTMLElement} event - The HTML element that triggered the event
 */
function renderTaskCardOverlay(event,) {
  let element = createdTasks.find((task) => task.title == event.querySelector("h3").textContent);
  let overlay = document.getElementById("task-card-overlay");
  overlay.innerHTML = taskCardOverlayTemplate(element);
  let assignedContacts = document.getElementById("card-assigned");
  overlay.classList.add("show");
  for (let index = 0; index < element.selectedContacts.length; index++) {
    let contact = contacts.find((contact) => contact.name == element.selectedContacts[index]);
    if (contact) {
      assignedContacts.innerHTML += secondAssignedContactsTemplate(element, index, contact);
    }
  }
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("show");
      overlay.innerHTML = "";
      editedSelectedContacts = [];
    }
  });
}

/**
 * Displays the assigned contacts in the task card
 * @param {Array<string>} selectedContacts - Array of selected contact names
 */
function showAssignedContacts(selectedContacts) {
  let assignedCirclesSectionRef = document.getElementById("assigned-circles-section");
  assignedCirclesSectionRef.innerHTML = "";
  let assignedContacts = contacts.filter((contact) => selectedContacts.includes(contact.name));
  for (let index = 0; index < assignedContacts.length; index++) {
    assignedCirclesSectionRef.innerHTML += userCircleTemplate(assignedContacts[index], assignedContacts[index].color);
  }
}

/**
 * Closes the task card overlay
 */
function closeTaskCardOverlay() {
  let taskCardOverlayRef = document.getElementById("task-card-overlay");
  taskCardOverlayRef.classList.remove("show");
  editedSelectedContacts = [];
}

/**
 * Deletes a task and updates the board
 * @param {string} title - Title of the task to delete
 * @async
 */
async function deleteTaskCardOverlay(title) {
  let element = createdTasks.find((task) => task.title == title);
  createdTasks.splice(createdTasks.indexOf(element), 1);
  await putTasks();
  await boardInit();
  closeTaskCardOverlay();
}

/**
 * Renders the edit overlay for a task
 * @param {Object} element - The task object to edit
 */
function renderTaskEditOverlay(element) {
  let editField = document.querySelector(".task-card");
  if (editField) {
    editField.innerHTML = taskEditOverlayTemplateOne(element);
    filterAndSortDropdown();
    toggleSubtasks();
    showAssignedContacts(element.selectedContacts);
    editedSelectedContacts = element.selectedContacts;
  }
}

/**
 * Resizes and repositions the add task overlay based on window height.
 * The overlay gets a smaller height on smaller screens and is positioned
 * vertically centered on the screen.
 * This function is called after the overlay is rendered and after the
 * window is resized.
 */
function resizeAndPositionOverlay() {
  let editField = document.getElementById("addTaskOverlayContent");
  setTimeout(() => {
    changeTaskEditOverlayHight(editField);
    changeOverlayPosition(editField)
  }, 200);

}

/**
 * Changes the height of the task edit overlay based on the window height.
 * If the window height is smaller than 970px, the overlay gets a smaller height.
 * @function
 */
function changeTaskEditOverlayHight() {
  let editField = document.getElementById("addTaskOverlayContent");
  if (editField !== null) {
    if (window.innerHeight < 1200) {
      editField.classList.add("edit-task-overlay-hight");
    } else {
      editField.classList.remove("edit-task-overlay-hight");
    }
  }
}

/**
 * Calculates the vertical position of the task edit overlay so that it is centered vertically on the screen.
 * The position is calculated by subtracting half of the overlay's height from 50% of the window's height.
 * @param {HTMLElement} editField - The HTML element of the task edit overlay
 */
function changeOverlayPosition(editField) {
  let overlayHeight = document.getElementById("addTaskOverlayContent").offsetHeight;
  editField.style.top = `calc(50% - ${overlayHeight / 2}px)`;
}

/**
 * Checks which contacts are selected in the dropdown and updates their visual state
 */
function checkSelectedContacts() {
  if (window.location.pathname.includes('board.html')) {
    if (typeof checkSelectedContacts === 'function') {
      let contactsContainer = document.getElementsByClassName("dropdown-item");
      for (let i = 0; i < contactsContainer.length; i++) {
        let contact = contactsContainer[i];
        let contactName = contact.querySelector("p").textContent;
        if (editedSelectedContacts.includes(contactName)) {
          contact.classList.add("checked");
          contact.querySelector(".cstm-checkbox").src = "./assets/svg/addTasksSvg/checked.svg";
        } else {
          contact.classList.remove("checked");
        }
      }
    }
  }
  return;

}

/**
 * Updates the selected contacts list when a contact is clicked
 * @param {HTMLElement} element - The clicked contact element
 */
function updateSelectedContacts(element) {
  if (window.location.pathname.includes('board.html')) {
    let contactName = element.querySelector("p").textContent;
    if (editedSelectedContacts.includes(contactName)) {
      let index = editedSelectedContacts.indexOf(contactName);
      editedSelectedContacts.splice(index, 1);
    } else {
      editedSelectedContacts.push(contactName);
    }
    showAssignedContacts(editedSelectedContacts);
  }
  return;
}
