let assignedContacts = [];
let dropdownItems = [];
let selectedContacts = [];

/**
 * Toggles the display of the dropdown content.
 */
function toggleDropdown() {
  let dropdown = document.getElementById("dropdown-content");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (
    !event.target.matches("#assigned-to-field") &&
    !event.target.closest(".dropdown-content")
  ) {
    closeDropdowns();
  }
};

function closeDropdowns() {
  let dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    let openDropdown = dropdowns[i];
    if (openDropdown.style.display === "block") {
      openDropdown.style.display = "none";
    }
  }
}

/**
 * Toggles the source of the "assign to" icon between a dropdown arrow and an upward arrow.
 * Changes the icon's source based on its current state.
 */
function toggleAssignToIconSrc() {
  let icon = document.getElementById("input-icon-assign-to");
  let src1 = "./assets/svg/addTasksSvg/arrow_drop_down.svg";
  let src2 = "./assets/svg/addTasksSvg/arrow_drop_up.svg";
  icon.src = icon.src.endsWith("arrow_drop_down.svg") ? src2 : src1;
}

// Custom Checkbox Handling
function checkIt(name, index) {
  let container = document.getElementById("dropdown-content");
  let dropdownItems = container.getElementsByClassName("dropdown-item");
  for (let i = 0; i < dropdownItems.length; i++) {
    let item = dropdownItems[i];
    let itemName = item.querySelector("p").textContent;
    if (itemName === name) {
      toggleCheckbox(item, name, index);
      break; // Stop after finding the correct item
    }
  }
  console.log(selectedContacts);
  renderUserCircles();
}

function toggleCheckbox(item, name, index) {
  let img = item.querySelector(".cstm-checkbox");
  let checkedSrc = "./assets/svg/addTasksSvg/checked.svg";
  let uncheckedSrc = "./assets/svg/addTasksSvg/Checkbutton.svg";
  if (img.src.endsWith("Checkbutton.svg")) {
    img.src = checkedSrc;
    item.classList.add("checked");
    selectedContacts.push({ name, index });
  } else {
    img.src = uncheckedSrc;
    item.classList.remove("checked");
    selectedContacts = selectedContacts.filter(
      (contact) => contact.name !== name
    );
  }
}

// Render user circles based on selected contacts
function renderUserCircles() {
  let assignedCirclesSection = document.getElementById(
    "assigned-circles-section"
  );
  assignedCirclesSection.innerHTML = "";
  for (let i = 0; i < selectedContacts.length; i++) {
    let contact = selectedContacts[i];
    let assignedContact = assignedContacts.find(
      (assigned) => assigned.name === contact.name
    );
    assignedCirclesSection.innerHTML += userCircleTemplate(
      contact,
      assignedContact.color
    );
  }
}

function userCircleTemplate(contact, color) {
  return `
    <div style="background-color:${color}; color:white;" class="addTask-profilepicture">
      ${contact.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()}
    </div>
  `;
}

// Create Task Button Validation
document.addEventListener("DOMContentLoaded", function () {
  let titleInput = document.querySelector(".addTask-title input");
  let dateInput = document.querySelector(".task-date input");
  let createTaskButton = document.querySelector(".createTask-button");

  function validateInputs() {
    createTaskButton.disabled =
      titleInput.value.trim() === "" || dateInput.value.trim() === "";
  }

  titleInput.addEventListener("input", validateInputs);
  dateInput.addEventListener("input", validateInputs);
  validateInputs();
});

// Search Functionality and Alphabetical Sorting
document.addEventListener("DOMContentLoaded", function () {
  let assignedToField = document.getElementById("assigned-to-field");
  let dropdownContent = document.getElementById("dropdown-content");

  assignedToField.addEventListener("input", filterDropdownItems);
  document
    .getElementById("assigned-to-field")
    .addEventListener("click", async function () {
      await renderAssignedContacts();
      sortDropdownItems();
    });
});

function sortDropdownItems() {
  dropdownItems.sort((a, b) => {
    const nameA = a.querySelector("p").textContent.toUpperCase();
    const nameB = b.querySelector("p").textContent.toUpperCase();
    return nameA.localeCompare(nameB);
  });
  let dropdownContent = document.getElementById("dropdown-content");
  while (dropdownContent.firstChild) {
    dropdownContent.removeChild(dropdownContent.firstChild);
  }
  dropdownItems.forEach((item) => dropdownContent.appendChild(item));
}

function filterDropdownItems() {
  let assignedToField = document.getElementById("assigned-to-field");
  let filter = assignedToField.value.toLowerCase();
  dropdownItems.forEach((item) => {
    let name = item.querySelector("p").textContent.toLowerCase();
    item.style.display = name.includes(filter) ? "" : "none";
  });
}

// Assign to field connection to contacts
async function getAssignedContacts() {
  assignedContacts = Object.values(await getData("contacts/"));
  console.log(assignedContacts);
  assignedContacts.sort((a, b) => a.name.localeCompare(b.name));
}

async function renderAssignedContacts() {
  await getAssignedContacts();
  let assignedContactsList = document.getElementById("dropdown-content");
  assignedContactsList.innerHTML = "";
  for (let index = 0; index < assignedContacts.length; index++) {
    assignedContactsList.innerHTML += assignedContactsTemplate(index);
  }
  // Update dropdownItems after rendering
  dropdownItems = Array.from(
    assignedContactsList.getElementsByClassName("dropdown-item")
  );
  // Restore selected state
  restoreSelectedState();
}

function restoreSelectedState() {
  selectedContacts.forEach((contact) => {
    let item = dropdownItems.find(
      (dropdownItem) =>
        dropdownItem.querySelector("p").textContent === contact.name
    );
    if (item) {
      let img = item.querySelector(".cstm-checkbox");
      img.src = "./assets/svg/addTasksSvg/checked.svg";
      item.classList.add("checked");
    }
  });
}

function assignedContactsTemplate(index) {
  return `
        <div onclick="checkIt('${
          assignedContacts[index].name
        }', ${index})" class="dropdown-item">
          <div style="background-color:${
            assignedContacts[index].color
          }" class="addTask-profilepicture">${assignedContacts[index].name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()}</div>
          <label class="custom-checkbox">
            <p>${assignedContacts[index].name}</p>
            <img class="cstm-checkbox" src="./assets/svg/addTasksSvg/Checkbutton.svg" alt="">
          </label>
        </div>
    `;
}
