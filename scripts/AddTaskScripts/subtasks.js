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
        let subtaskItem = document.querySelector(`.item-${subtaskEditInput.dataset.oldValue.replaceAll(" ", "-")}`);
        subtaskItem.innerHTML = newValue;
        subtaskItem.classList.remove(`item-${subtaskEditInput.dataset.oldValue.replaceAll(" ", "-")}`);
        subtaskItem.classList.add(`item-${newValue.replaceAll(" ", "-")}`);
        let deleteButton = subtaskItem.parentElement.querySelector(".delete-subtask-item-btn");
        deleteButton.setAttribute("onclick", `deleteSubtaskItem(this)`);
        let editButton = subtaskItem.parentElement.querySelector(".edit-subtask-item-btn");
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
    document.querySelector(".addTask-subtasks input").addEventListener("input", function () {
        let subtaskAdd = document.querySelector(".subtask-add");
        let cancelCheckBtn = document.querySelector(".cancel-check-btn");
        if (this.value.trim() !== "") {
            subtaskAdd.style.display = "none";
            cancelCheckBtn.style.display = "flex";
        } else {
            subtaskAdd.style.display = "block";
            cancelCheckBtn.style.display = "none";
        }
    });
    document.querySelector(".addTask-subtasks input").addEventListener("keydown", function (event) {
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
    if (categoryDropdown.classList.contains("d-none")) {
        categoryDropdown.classList.remove("d-none");
    } else {
        categoryDropdown.classList.add("d-none");
    }
    toggleCategoryIconSrc();
}

/**
 * Toggle the dropdown arrow icon for the category selector between up and down arrows
 * @see toggleCategoryDropdown
 */
function toggleCategoryIconSrc() {
    let categoryDropdown = document.querySelector(".category-dropdown");
    let icon = document.getElementById("input-icon-category");
    let src1 = "./assets/svg/addTasksSvg/arrow_drop_down.svg";
    let src2 = "./assets/svg/addTasksSvg/arrow_drop_up.svg";
    icon.src = categoryDropdown.classList.contains("d-none") ? src1 : src2;
}

/**
 * Set the selected category and update the UI
 * @param {string} category - The category to set
 */
function setCategory(category) {
    selectedCategory = category;
    document.getElementById("category-field").value = category;
    toggleCategoryDropdown();
    toggleCategoryIconSrc();
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
        categoryDropdown.classList.add("d-none");
        toggleCategoryIconSrc();
    }
}