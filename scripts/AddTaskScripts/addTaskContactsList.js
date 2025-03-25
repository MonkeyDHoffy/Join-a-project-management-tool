// These arrays store contacts data for the dropdown functionality
let assignedContacts = [];
let dropdownItems = [];
let selectedContacts = [];


/**
 * Toggles the dropdown menu visibility and updates the contact selection status
 * @async
 * @returns {Promise<void>}
 */
async function toggleDropdown() {
  await toggleCheckedBackground();
  if (window.location.pathname.includes('board.html')) {
    if (typeof checkSelectedContacts === 'function') {
      checkSelectedContacts();
    }
  }
}
/**
 * Toggles the visibility state of the dropdown content between visible and hidden
 * @async
 * @returns {Promise<void>}
 */
async function toggleCheckedBackground() {
  let dropdown = document.getElementById("dropdown-content");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

/**
 * Closes dropdown when user clicks outside of the dropdown area
 * @param {Event} event - The click event object
 */
window.onclick = function (event) {
  if (
    !event.target.matches("#assigned-to-field") &&
    !event.target.closest(".dropdown-content")
  ) {
    closeDropdowns();
  }
};

/**
 * Closes all open dropdown menus on the page
 */
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
 * Toggles the dropdown arrow icon between pointing down and up
 */
function toggleAssignToIconSrc() {
  let icon = document.getElementById("input-icon-assign-to");
  let src1 = "./assets/svg/addTasksSvg/arrow_drop_down.svg";
  let src2 = "./assets/svg/addTasksSvg/arrow_drop_up.svg";
  icon.src = icon.src.endsWith("arrow_drop_down.svg") ? src2 : src1;
}

/**
 * Finds and checks a specific contact in the dropdown by name and index
 * @param {string} name - The name of the contact to check
 * @param {number} index - The index of the contact in the contacts array
 */
function checkIt(name, index) {
  let container = document.getElementById("dropdown-content");
  let dropdownItems = container.getElementsByClassName("dropdown-item");
  for (let i = 0; i < dropdownItems.length; i++) {
    let item = dropdownItems[i];
    let itemName = item.querySelector("p").textContent;
    if (itemName === name) {
      toggleCheckbox(item, name, index);
      break; 
    }
  }
  renderUserCircles();
}

/**
 * Toggles the checkbox state for a contact and updates the selected contacts list
 * @param {HTMLElement} item - The dropdown item element containing the checkbox
 * @param {string} name - The name of the contact
 * @param {number} index - The index of the contact in the contacts array
 */
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

/**
 * Renders user profile circles for all selected contacts in the assigned section
 */
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

/**
 * Creates HTML template for a user circle with initials and background color
 * @param {Object} contact - The contact object containing name information
 * @param {string} color - The background color for the user circle
 * @returns {string} HTML template string for the user circle
 */
function userCircleTemplate(contact, color) {
  return `
    <div style="background-color:${color}; color:white;" class="addTask-profilepicture">
      ${contact.name.split(" ").map((word) => word[0]).join("").toUpperCase()}
    </div>
  `;
}

/**
 * Validates if all required form inputs are filled to enable the create task button
 */
function validateInputs() {
  let requiredTexts = document.querySelectorAll(".required-text span");
  let titleInput = document.querySelector(".addTask-title input");
  let dateInput = document.querySelector(".task-date input");
  let categoryInput = document.getElementById("category-field");
  let createTaskButton = document.querySelector(".createTask-button");
  createTaskButton.disabled = titleInput.value.trim() === "" || dateInput.value.trim() === "" || categoryInput.value === "Select task category";
  for (let index = 0; index < requiredTexts.length; index++) {
    if (!requiredTexts[index].classList.contains("d-none")) {
      createTaskButton.disabled = true;
    }
  }
}

/**
 * Sets up input field validation by adding event listeners to required fields
 */
function validateInputFields() {
  let titleInput = document.querySelector(".addTask-title input");
  let dateInput = document.querySelector(".task-date input");
  titleInput.addEventListener("input", validateInputs);
  dateInput.addEventListener("input", validateInputs);
  validateInputs();
}

/**
 * Renders contacts in the dropdown and sorts them alphabetically
 * @async
 * @returns {Promise<void>}
 */
async function filterAndSortDropdown() {
  await renderAssignedContacts();
  sortDropdownItems();
}

/**
 * Sorts dropdown items alphabetically by contact name
 */
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

/**
 * Filters dropdown items based on user input in the search field
 */
function filterDropdownItems() {
  let assignedToField = document.getElementById("assigned-to-field");
  let filter = assignedToField.value.toLowerCase();
  dropdownItems.forEach((item) => {
    let name = item.querySelector("p").textContent.toLowerCase();
    item.style.display = name.includes(filter) ? "" : "none";
  });
}

/**
 * Fetches contact data from storage and sorts alphabetically
 * @async
 * @returns {Promise<void>}
 */
async function getAssignedContacts() {
  assignedContacts = Object.values(await getData("contacts/"));
  assignedContacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Renders all contacts in the dropdown menu and restores selected state
 * @async
 * @returns {Promise<void>}
 */
async function renderAssignedContacts() {
  await getAssignedContacts();
  let assignedContactsList = document.getElementById("dropdown-content");
  assignedContactsList.innerHTML = "";
  for (let index = 0; index < assignedContacts.length; index++) {
    assignedContactsList.innerHTML += assignedContactsTemplate(index);
  }
  dropdownItems = Array.from(
    assignedContactsList.getElementsByClassName("dropdown-item")
  );
  restoreSelectedState();
}

/**
 * Restores the selected state of contacts in the dropdown after re-rendering
 */
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

/**
 * Creates HTML template for a contact item in the dropdown list
 * @param {number} index - The index of the contact in the assignedContacts array
 * @returns {string} HTML template string for the contact dropdown item
 */
function assignedContactsTemplate(index) {
  return `
        <div onclick="checkIt('${assignedContacts[index].name}', ${index}); updateSelectedContacts(this)" class="dropdown-item">
          <div style="background-color:${assignedContacts[index].color}" class="addTask-profilepicture">
            ${assignedContacts[index].name.split(" ").map((word) => word[0]).join("").toUpperCase()}
          </div>
          <label class="custom-checkbox">
            <p>${assignedContacts[index].name}</p>
            <img class="cstm-checkbox" src="./assets/svg/addTasksSvg/Checkbutton.svg" alt="">
          </label>
        </div>
    `;
}
