// Initialize the task creation form by setting the icons
function addTaskInit() {
  setIcons();
  changeMediumBtn();
}

let priority = [];

// Set the initial icons for the priority buttons
function setIcons() {
  urgentIcon();
  mediumIcon();
  lowIcon();
}

// Set the icon for the urgent button to the default state
function urgentIcon() {
  document.getElementById("urgent-img").src =
    "./assets/svg/addTasksSvg/urgent.svg";
}

// Set the icon for the medium button to the default state
function mediumIcon() {
  document.getElementById("medium-img").src =
    "./assets/svg/addTasksSvg/medium.svg";
}

// Set the icon for the low button to the default state
function lowIcon() {
  document.getElementById("low-img").src = "./assets/svg/addTasksSvg/low.svg";
}

// Set the icon for the urgent button to the active state
function urgentIconActive() {
  document.getElementById("urgent-img").src =
    "./assets/svg/addTasksSvg/urgentactive.svg";
}

// Set the icon for the medium button to the active state
function mediumIconActive() {
  document.getElementById("medium-img").src =
    "./assets/svg/addTasksSvg/mediumactive.svg";
}

// Set the icon for the low button to the active state
function lowIconActive() {
  document.getElementById("low-img").src =
    "./assets/svg/addTasksSvg/lowactive.svg";
}

// Change the urgent button to the active state and reset the other buttons
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

// Set the urgent button to the active state
function toggleUrgent() {
  priority = "urgent";
  let urgentBtn = document.getElementById("urgent-btn");
  urgentBtn.classList.remove("prio-btn-urgent");
  urgentBtn.classList.add("urgent-btn-active");
}

// Reset the urgent button to the default state
function toggleUrgentActive() {
  let urgentBtn = document.getElementById("urgent-btn");
  urgentBtn.classList.remove("urgent-btn-active");
  urgentBtn.classList.add("prio-btn-urgent");
}

// Change the medium button to the active state and reset the other buttons
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

// Set the medium button to the active state
function toggleMedium() {
  priority = "medium";
  let mediumBtn = document.getElementById("medium-btn");
  mediumBtn.classList.remove("prio-btn-medium");
  mediumBtn.classList.add("medium-btn-active");
}

// Reset the medium button to the default state
function toggleMediumActive() {
  let mediumBtn = document.getElementById("medium-btn");
  mediumBtn.classList.remove("medium-btn-active");
  mediumBtn.classList.add("prio-btn-medium");
}

// Change the low button to the active state and reset the other buttons
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

// Set the low button to the active state
function toggleLow() {
  priority = "low";
  let lowBtn = document.getElementById("low-btn");
  lowBtn.classList.remove("prio-btn-low");
  lowBtn.classList.add("low-btn-active");
}

// Reset the low button to the default state
function toggleLowActive() {
  let lowBtn = document.getElementById("low-btn");
  lowBtn.classList.remove("low-btn-active");
  lowBtn.classList.add("prio-btn-low");
}

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
  changeMediumBtn();
}

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

function focusSubtaskInput() {
  document.querySelector(".addTask-subtasks input").focus();
}

function renderSubtaskList() {
  cancelEditSubtaskItem();
  let subtaskInput = document.querySelector(".addTask-subtasks input");
  let subtaskList = document.querySelector(".subtask-list");
  if (subtaskInput.value.trim() !== "") {
    subtaskList.innerHTML += subtaskListTemplate(subtaskInput);
    subtaskInput.value = "";
  }
}

function deleteSubtaskItem(subtaskValue) {
  let subtaskItem = document.querySelector(
    `.item-${subtaskValue}`
  ).parentElement;
  subtaskItem.remove();
}

function subtaskListTemplate(subtaskInput) {
  return `<div class="subtask-item-field">
  <li id="subtask-item" class="item-${subtaskInput.value}">${subtaskInput.value}</li>
  
     <div class="btn-section"><img onclick="editSubtaskItem('${subtaskInput.value}')" class="edit-subtask-item-btn" src="./assets/svg/contacts_svg/edit.svg" alt=""><img onclick="deleteSubtaskItem('${subtaskInput.value}')" class="delete-subtask-item-btn"
            src="./assets/svg/contacts_svg/delete.svg" alt=""></div>
    </div>
`;
}

function editSubtaskItem(subtaskValue) {
  document.querySelector(".subtask-list").style.display = "none";
  let editField = document.getElementById("edit-subtask-item-field");
  editField.style.display = "block";
  let subtaskEditInput = editField.querySelector("input");
  subtaskEditInput.value = subtaskValue;
  subtaskEditInput.dataset.oldValue = subtaskValue;
  // oldValue is used to store the old value of the subtask item, so we can compare it with the new value
  // .dataset is used to store custom data attributes in the DOM, so we can access them later !!!!
}

function cancelEditSubtaskItem() {
  document.querySelector(".subtask-list").style.display = "block";
  document.getElementById("edit-subtask-item-field").style.display = "none";
}

function deleteSubInputValue() {
  let subtaskEditInput = document.getElementById("subtask-edit-input");
  if (subtaskEditInput) {
    subtaskEditInput.value = "";
  }
  document.getElementById("subtask-edit-input").focus();
}

// Diese Funktion bestätigt die Bearbeitung eines Subtasks
function confirmSubEdit() {
  // Den neuen Wert aus dem Eingabefeld holen
  let subtaskEditInput = document.getElementById("subtask-edit-input");
  let newValue = subtaskEditInput.value.trim();
  // Wenn der neue Wert nicht leer ist, den Subtask aktualisieren
  if (newValue !== "") {
    // Das Subtask-Element finden und aktualisieren
    let subtaskItem = document.querySelector(
      `.item-${subtaskEditInput.dataset.oldValue}`
    );
    subtaskItem.innerHTML = newValue;
    subtaskItem.classList.remove(`item-${subtaskEditInput.dataset.oldValue}`);
    subtaskItem.classList.add(`item-${newValue}`);
    // Die deleteSubtaskItem-Funktion weiterhin funktionsfähig halten
    let deleteButton = subtaskItem.parentElement.querySelector(
      ".delete-subtask-item-btn"
    );
    deleteButton.setAttribute("onclick", `deleteSubtaskItem('${newValue}')`);
    // Die editSubtaskItem-Funktion weiterhin funktionsfähig halten
    let editButton = subtaskItem.parentElement.querySelector(
      ".edit-subtask-item-btn"
    );
    editButton.setAttribute("onclick", `editSubtaskItem('${newValue}')`);
  }
  // Die Bearbeitungsansicht ausblenden
  cancelEditSubtaskItem();
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to toggle subtask buttons based on input value
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
});
