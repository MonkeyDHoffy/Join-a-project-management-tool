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
  let inputFieldsRef = Array.from(document.getElementsByClassName("add-task-input-field"));
  inputFieldsRef.forEach(inputField => {
    inputField.value = "";
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