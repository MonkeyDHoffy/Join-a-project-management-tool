/**
 * Toggles the display of the dropdown content.
 * If the dropdown is currently visible, it hides it.
 * If the dropdown is currently hidden, it shows it.
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
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

/**
 * Toggles the source of the "assign to" icon between a dropdown arrow and an upward arrow.
 * Changes the icon's source based on its current state.
 */
function toggleAssignToIconSrc() {
  let icon = document.getElementById("input-icon-assign-to");
  let src1 = "./assets/svg/addTasksSvg/arrow_drop_down.svg";
  let src2 = "./assets/svg/addTasksSvg/arrow_drop_up.svg";

  if (icon.src.endsWith("arrow_drop_down.svg")) {
    icon.src = src2;
  } else {
    icon.src = src1;
  }
}

//Custom-Checkbox-----------------------------------------------------------------------------------
function checkIt(name) {
  let container = document.getElementById("dropdown-content");
  let dropdownItems = container.getElementsByClassName("dropdown-item");

  for (let i = 0; i < dropdownItems.length; i++) {
    let item = dropdownItems[i];
    let itemName = item.querySelector("p").textContent;

    if (itemName === name) {
      let img = item.querySelector(".cstm-checkbox");
      let checkedSrc = "./assets/svg/addTasksSvg/checked.svg";
      let uncheckedSrc = "./assets/svg/addTasksSvg/Checkbutton.svg";

      if (img.src.endsWith("Checkbutton.svg")) {
        img.src = checkedSrc;
        item.classList.add("checked");
      } else {
        img.src = uncheckedSrc;
        item.classList.remove("checked");
      }
      break; // Stop after finding the correct item
    }
  }
}

//Create Task Button validation ---------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  let titleInput = document.querySelector(".addTask-title input");
  let dateInput = document.querySelector(".task-date input");
  let createTaskButton = document.querySelector(".createTask-button");

  function validateInputs() {
    // Check if both title and date inputs are not empty
    if (titleInput.value.trim() !== "" && dateInput.value.trim() !== "") {
      createTaskButton.disabled = false;
    } else {
      createTaskButton.disabled = true;
    }
  }

  // Add event listeners to the title and date inputs to validate on input change
  titleInput.addEventListener("input", validateInputs);
  dateInput.addEventListener("input", validateInputs);

  // Initial validation check when the page loads
  validateInputs();
});

// Search Functionality and Alphabetical Sorting------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  let assignedToField = document.getElementById("assigned-to-field");
  let dropdownContent = document.getElementById("dropdown-content");
  let dropdownItems = Array.from(
    dropdownContent.getElementsByClassName("dropdown-item")
  );

  // Function to sort dropdown items
  function sortDropdownItems() {
    dropdownItems.sort((a, b) => {
      const nameA = a.querySelector("p").textContent.toUpperCase();
      const nameB = b.querySelector("p").textContent.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    // Remove all existing elements from the container
    while (dropdownContent.firstChild) {
      dropdownContent.removeChild(dropdownContent.firstChild);
    }

    // Add the sorted elements back to the container
    dropdownItems.forEach((item) => dropdownContent.appendChild(item));
  }

  // Function to filter dropdown items based on search input
  function filterDropdownItems() {
    let filter = assignedToField.value.toLowerCase();
    dropdownItems.forEach((item) => {
      let name = item.querySelector("p").textContent.toLowerCase();
      item.style.display = name.includes(filter) ? "" : "none";
    });
  }

  // Event listener for search input
  assignedToField.addEventListener("input", filterDropdownItems);

  // Sort dropdown items initially
  sortDropdownItems();

  // Re-sort when dropdown is opened
  document
    .getElementById("assigned-to-field")
    .addEventListener("click", sortDropdownItems);
});

// Assigne to field  connection to contacts----------------------------------------------------------------------------

let assignedContacts = [];

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
    assignedContactsList.innerHTML += `
        <div onclick="checkIt('${
          assignedContacts[index].name
        }')" class="dropdown-item">
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
}
