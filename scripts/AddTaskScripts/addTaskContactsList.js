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
function checkIt(id) {
  let item = document.getElementsByClassName("dropdown-item")[id];
  let img = item.querySelector(".cstm-checkbox");
  let checkedSrc = "./assets/svg/addTasksSvg/checked.svg"; // Path to your custom checked image
  let uncheckedSrc = "./assets/svg/addTasksSvg/Checkbutton.svg"; // Path to your custom unchecked image

  if (img.src.endsWith("Checkbutton.svg")) {
    img.src = checkedSrc;
    item.classList.add("checked");
  } else {
    img.src = uncheckedSrc;
    item.classList.remove("checked");
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

// Search Functionality-------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  let assignedToField = document.getElementById("assigned-to-field");
  let dropdownContent = document.getElementById("dropdown-content");
  let dropdownItems = dropdownContent.getElementsByClassName("dropdown-item");

  // Function to filter dropdown items based on search input
  function filterDropdownItems() {
    let filter = assignedToField.value.toLowerCase();
    for (let i = 0; i < dropdownItems.length; i++) {
      let item = dropdownItems[i];
      let name = item.querySelector("p").textContent.toLowerCase();
      if (name.includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  }

  // Add event listener to the assigned-to-field input to filter dropdown items on input change
  assignedToField.addEventListener("input", filterDropdownItems);
});
