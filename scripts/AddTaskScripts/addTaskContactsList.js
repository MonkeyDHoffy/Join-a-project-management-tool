function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-content");
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
