/**
 * Initialize the task creation form by setting the icons and initializing various components
 */
function addTaskInit() {
  renderUserIconName();
  validateInputFields();
  filterAndSortDropdown();
  toggleSubtasks();
  createTaskInit();
  setIcons();
  changeMediumBtn();
}

let priority = "medium";
let technicalTask = "Technical Task";
let UserStory = "User Story";
let selectedCategory = "";
let subtasks = [];

/**
 * Set the initial icons for the priority buttons
 */
function setIcons() {
  urgentIcon();
  mediumIcon();
  lowIcon();
}

/**
 * Set the icon for the urgent button to the default state
 */
function urgentIcon() {
  document.getElementById("urgent-img").src =
    "./assets/svg/addTasksSvg/urgent.svg";
}

/**
 * Set the icon for the medium button to the default state
 */
function mediumIcon() {
  document.getElementById("medium-img").src =
    "./assets/svg/addTasksSvg/medium.svg";
}

/**
 * Set the icon for the low button to the default state
 */
function lowIcon() {
  document.getElementById("low-img").src = "./assets/svg/addTasksSvg/low.svg";
}

/**
 * Set the icon for the urgent button to the active state
 */
function urgentIconActive() {
  document.getElementById("urgent-img").src =
    "./assets/svg/addTasksSvg/urgentactive.svg";
}

/**
 * Set the icon for the medium button to the active state
 */
function mediumIconActive() {
  document.getElementById("medium-img").src =
    "./assets/svg/addTasksSvg/mediumactive.svg";
}

/**
 * Set the icon for the low button to the active state
 */
function lowIconActive() {
  document.getElementById("low-img").src =
    "./assets/svg/addTasksSvg/lowactive.svg";
}

/**
 * Change the urgent button to the active state and reset the other buttons
 */
function changeUrgentBtn() {
  toggleUrgent();
  urgentIconActive();
  document.getElementById("medium-img").src = "";
  document.getElementById("low-img").src = "";
  mediumIcon();
  lowIcon();
  toggleMediumActive();
  toggleLowActive();
}

/**
 * Set the urgent button to the active state
 */
function toggleUrgent() {
  priority = "urgent";
  let urgentBtn = document.getElementById("urgent-btn");
  urgentBtn.classList.remove("prio-btn-urgent");
  urgentBtn.classList.add("urgent-btn-active");
}

/**
 * Reset the urgent button to the default state
 */
function toggleUrgentActive() {
  let urgentBtn = document.getElementById("urgent-btn");
  urgentBtn.classList.remove("urgent-btn-active");
  urgentBtn.classList.add("prio-btn-urgent");
}

/**
 * Change the medium button to the active state and reset the other buttons
 */
function changeMediumBtn() {
  toggleMedium();
  mediumIconActive();
  document.getElementById("urgent-img").src = "";
  document.getElementById("low-img").src = "";
  urgentIcon();
  lowIcon();
  toggleUrgentActive();
  toggleLowActive();
}

/**
 * Set the medium button to the active state
 */
function toggleMedium() {
  priority = "medium";
  let mediumBtn = document.getElementById("medium-btn");
  mediumBtn.classList.remove("prio-btn-medium");
  mediumBtn.classList.add("medium-btn-active");
}

/**
 * Reset the medium button to the default state
 */
function toggleMediumActive() {
  let mediumBtn = document.getElementById("medium-btn");
  mediumBtn.classList.remove("medium-btn-active");
  mediumBtn.classList.add("prio-btn-medium");
}

/**
 * Change the low button to the active state and reset the other buttons
 */
function changeLowBtn() {
  toggleLow();
  lowIconActive();
  document.getElementById("urgent-img").src = "";
  document.getElementById("medium-img").src = "";
  mediumIcon();
  urgentIcon();
  toggleMediumActive();
  toggleUrgentActive();
}

/**
 * Set the low button to the active state
 */
function toggleLow() {
  priority = "low";
  let lowBtn = document.getElementById("low-btn");
  lowBtn.classList.remove("prio-btn-low");
  lowBtn.classList.add("low-btn-active");
}

/**
 * Reset the low button to the default state
 */
function toggleLowActive() {
  let lowBtn = document.getElementById("low-btn");
  lowBtn.classList.remove("low-btn-active");
  lowBtn.classList.add("prio-btn-low");
}

/**
 * Reset all form inputs and selections to their default state
 */
function resetAddTaskInputs() {
  clearInputFields();
  changeMediumBtn();
  clearAssignedContacts();
  clearSubtasks();
  validateInputs();
}

/**
 * Clear all subtasks from the list and reset the subtasks array
 */
function clearSubtasks() {
  subtasks = [];
  let subtasksListRef = document.getElementById("subtasksList");
  subtasksListRef.innerHTML = "";
}

/**
 * Clear all assigned contacts and update the UI
 */
function clearAssignedContacts() {
  selectedContacts = [];
  renderAssignedContacts();
  renderUserCircles();
}

/**
 * Clear all input fields and remove any validation errors
 */
function clearInputFields() {
  let requiredTitleRef = document.getElementById("requiredTitle");
  let requiredDateRef = document.getElementById("requiredDate");
  requiredTitleRef.classList.add("d-none");
  requiredDateRef.classList.add("d-none");
  let inputFieldsRef = Array.from(
    document.getElementsByClassName("add-task-input-field")
  );
  inputFieldsRef.forEach((inputField) => {
    inputField.value = "";
    inputField.classList.remove("invalid");
  });
}

/**
 * Toggle the dropdown icon for the category selector between up and down arrows
 */
function toggleCategoryIconSrc() {
  let icon = document.getElementById("input-icon-category");
  let src1 = "./assets/svg/addTasksSvg/arrow_drop_down.svg";
  let src2 = "./assets/svg/addTasksSvg/arrow_drop_up.svg";
  if (icon.src.endsWith("arrow_drop_down.svg")) {
    icon.src = src2;
  } else {
    icon.src = src1;
  }
}

/**
 * Show a notification that a task was successfully added and redirect to the board
 */
function showTaskNotification() {
  let notification = document.querySelector(".click-notification-add-task");
  if (notification) {
    resetAddTaskInputs();
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      window.location.href = "./board.html";
    }, 2000);
  }
}

/**
 * Show a notification that a task was successfully added from the overlay without redirecting
 */
function showTaskNotificationOverlayAddTask() {
  let notification = document.querySelector(".click-notification-add-task");
  if (notification) {
    resetAddTaskInputs();
    notification.classList.add("show");
    boardInit();
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
}

/**
 * Add required validation for the title field
 * @param {HTMLElement} element - The title input element to validate
 */
function addRequiredTitle(element) {
  let requiredTextTitle = document.getElementById("requiredTitle");
  element.setAttribute("required", "true");
  if (element.value == "") {
    requiredTextTitle.classList.remove("d-none");
    element.classList.add("invalid");
  } else {
    requiredTextTitle.classList.add("d-none");
  }
}

/**
 * Add required validation for the date field
 * @param {HTMLElement} element - The date input element to validate
 */
function addRequiredDate(element) {
  let requiredTextDate = document.getElementById("requiredDate");
  element.setAttribute("required", "true");
  if (element.value == "") {
    requiredTextDate.classList.remove("d-none");
    element.classList.add("invalid");
  } else {
    requiredTextDate.classList.add("d-none");
  }
}

//Subtask functions-----------------------------------------------------------------------------

/**
 * Focus the input field for adding subtasks
 */
function focusSubtaskInput() {
  document.querySelector(".addTask-subtasks input").focus();
}

/**
 * Add a new subtask to the list from the input field
 */
function renderSubtaskList() {
  cancelEditSubtaskItem();
  let subtaskInput = document.querySelector(".addTask-subtasks input");
  let subtaskList = document.querySelector(".subtask-list");
  if (subtaskInput.value.trim() !== "") {
    subtaskList.innerHTML += subtaskListTemplate(subtaskInput);
    subtasks.push(subtaskInput.value);
    subtaskInput.value = "";
    subtaskInput.dispatchEvent(new Event("input"));
  }
}

/**
 * Remove a subtask from the list
 * @param {HTMLElement} element - The delete button element that was clicked
 */
function deleteSubtaskItem(element) {
  element.parentElement.parentElement.remove();
}

/**
 * Generate HTML template for a subtask item
 * @param {HTMLInputElement} subtaskInput - The input element containing the subtask value
 * @returns {string} HTML template for the subtask item
 */
function subtaskListTemplate(subtaskInput) {
  return `<div class="subtask-item-field">
  <li class="item-${subtaskInput.value.replaceAll(" ", "-")} subtask-item">${
    subtaskInput.value
  }</li>
     <div class="btn-section"><img onclick="editSubtaskItem('${
       subtaskInput.value
     }')" class="edit-subtask-item-btn" src="./assets/svg/contacts_svg/edit.svg" alt=""><img onclick="deleteSubtaskItem(this)" class="delete-subtask-item-btn"
            src="./assets/svg/contacts_svg/delete.svg" alt=""></div>
    </div>
`;
}

/**
 * Enable editing of a specific subtask
 * @param {string} subtaskValue - The current value of the subtask to edit
 */
function editSubtaskItem(subtaskValue) {
  document.querySelector(".subtask-list").style.display = "none";
  let editField = document.getElementById("edit-subtask-item-field");
  editField.style.display = "block";
  let subtaskEditInput = editField.querySelector("input");
  subtaskEditInput.value = subtaskValue;
  subtaskEditInput.dataset.oldValue = subtaskValue;
}

/**
 * Cancel the subtask editing mode
 */
function cancelEditSubtaskItem() {
  document.querySelector(".subtask-list").style.display = "block";
  document.getElementById("edit-subtask-item-field").style.display = "none";
}

/**
 * Clear the subtask input field during editing and set focus to it
 */
function deleteSubInputValue() {
  let subtaskEditInput = document.getElementById("subtask-edit-input");
  if (subtaskEditInput) {
    subtaskEditInput.value = "";
  }
  document.getElementById("subtask-edit-input").focus();
}

/**
 * Save the edited subtask value
 */
function confirmSubEdit() {
  let subtaskEditInput = document.getElementById("subtask-edit-input");
  let newValue = subtaskEditInput.value.trim();
  if (newValue !== "") {
    let subtaskItem = document.querySelector(
      `.item-${subtaskEditInput.dataset.oldValue.replaceAll(" ", "-")}`
    );
    subtaskItem.innerHTML = newValue;
    subtaskItem.classList.remove(`item-${subtaskEditInput.dataset.oldValue.replaceAll(" ", "-")}`);
    subtaskItem.classList.add(`item-${newValue.replaceAll(" ", "-")}`);
    let deleteButton = subtaskItem.parentElement.querySelector(
      ".delete-subtask-item-btn"
    );
    deleteButton.setAttribute("onclick", `deleteSubtaskItem(this)`);
    let editButton = subtaskItem.parentElement.querySelector(
      ".edit-subtask-item-btn"
    );
    editButton.setAttribute("onclick", `editSubtaskItem('${newValue}')`);
  }
  cancelEditSubtaskItem();
}

/**
 * Cancel adding a new subtask and clear the input
 */
function cancelSubInput() {
  let subtaskInput = document.querySelector(".addTask-subtasks input");
  subtaskInput.value = "";
  subtaskInput.dispatchEvent(new Event("input")); 
  document.querySelector(".addTask-subtasks input").focus();
}

/**
 * Set up event listeners for the subtask input field to show/hide buttons and handle Enter key
 */
function toggleSubtasks() {
  document
    .querySelector(".addTask-subtasks input")
    .addEventListener("input", function () {
      let subtaskAdd = document.querySelector(".subtask-add");
      let cancelCheckBtn = document.querySelector(".cancel-check-btn");
      if (this.value.trim() !== "") {
        subtaskAdd.style.display = "none";
        cancelCheckBtn.style.display = "block";
      } else {
        subtaskAdd.style.display = "block";
        cancelCheckBtn.style.display = "none";
      }
    });

    document
    .querySelector(".addTask-subtasks input")
    .addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault(); 
        renderSubtaskList(); 
      }
    });
}

/**
 * Toggle the visibility of the category dropdown menu
 */
function toggleCategoryDropdown() {
  let categoryDropdown = document.querySelector(".category-dropdown");
  if (categoryDropdown.style.display === "none") {
    categoryDropdown.style.display = "block";
  } else {
    categoryDropdown.style.display = "none";
  }
}

/**
 * Set the selected category and update the UI
 * @param {string} category - The category to set
 */
function setCategory(category) {
  selectedCategory = category;
  document.getElementById("category-field").value = category;
  toggleCategoryDropdown();
  validateInputs();
}

/**
 * Close the category dropdown when clicking outside
 * @param {Event} event - The click event
 */
function closeCategoryDropdown(event) {
  let categoryDropdown = document.querySelector(".category-dropdown");
  let categoryField = document.getElementById("category-field");
  if (event.target !== categoryField && event.target !== categoryDropdown) {
    categoryDropdown.style.display = "none";
  }
}


