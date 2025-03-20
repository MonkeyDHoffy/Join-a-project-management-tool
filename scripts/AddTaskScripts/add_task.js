let priority = "medium";
let technicalTask = "Technical Task";
let UserStory = "User Story";
let selectedCategory = "";
let subtasks = [];

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
  document.getElementById("urgent-img").src = "./assets/svg/addTasksSvg/urgent.svg";
}

/**
 * Set the icon for the medium button to the default state
 */
function mediumIcon() {
  document.getElementById("medium-img").src = "./assets/svg/addTasksSvg/medium.svg";
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
  document.getElementById("urgent-img").src = "./assets/svg/addTasksSvg/urgentactive.svg";
}

/**
 * Set the icon for the medium button to the active state
 */
function mediumIconActive() {
  document.getElementById("medium-img").src = "./assets/svg/addTasksSvg/mediumactive.svg";
}

/**
 * Set the icon for the low button to the active state
 */
function lowIconActive() {
  document.getElementById("low-img").src = "./assets/svg/addTasksSvg/lowactive.svg";
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
  checkIfDateIsEmpty(element, requiredTextDate);
  checkIfDateIsInThePast(element, requiredTextDate);
}

function checkIfDateIsEmpty(element, requiredTextDate) {
  element.setAttribute("required", "true");
  if (element.value == "") {
    requiredTextDate.classList.remove("d-none");
    element.classList.add("invalid");
  } else {
    requiredTextDate.classList.add("d-none");
  }
}

function checkIfDateIsInThePast(element, requiredTextDate) {
  let dueDate = new Date(element.value).getTime();
  let today = new Date().getTime();
  if (dueDate < today) {
    element.classList.add("invalid");
    requiredTextDate.textContent = "Date must be in the future";
    requiredTextDate.classList.remove("d-none");
  }
}
