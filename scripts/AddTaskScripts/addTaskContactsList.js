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
  const item = document.getElementsByClassName("dropdown-item")[id];
  const img = item.querySelector(".cstm-checkbox");
  const checkedSrc = "./assets/svg/addTasksSvg/checked.svg"; // Path to your custom checked image
  const uncheckedSrc = "./assets/svg/addTasksSvg/Checkbutton.svg"; // Path to your custom unchecked image

  if (img.src.endsWith("Checkbutton.svg")) {
    img.src = checkedSrc;
    item.classList.add("checked");
  } else {
    img.src = uncheckedSrc;
    item.classList.remove("checked");
  }
}
