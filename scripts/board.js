let taskStatus = ["to do", "in-progress", "await feedback", "done"];
let currentDragedElement = null;
let cardIndex = 0;

async function boardInit() {
  await getTasks();
  await getContacts();
  updateHTML();
}

//-- render all tasks on the board
function updateHTML() {
  renderTasks("toDo", "toDo");
  renderTasks("inProgress", "inProgress");
  renderTasks("awaitFeedback", "awaitFeedback");
  renderTasks("done", "done");
  hideSubtasksIfEmpty();
  breakDescriptions();
  cardIndex = 0;
}

function renderTasks(status, elementId) {
  let tasks = createdTasks.filter((task) => task.status === status);
  document.getElementById(elementId).innerHTML = "";
  if (tasks.length === 0) {
    document.getElementById(elementId).innerHTML += noTasksTemplate(taskStatus.indexOf(status));
  }
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById(elementId).innerHTML += taskCardTemplate(tasks[i]);
    for (let index = 0; index < tasks[i].selectedContacts.length; index++) {
      let assignedContact = contacts.find(
        (contact) => contact.name === tasks[i].selectedContacts[index]
      );
      document.getElementsByClassName("board-card-assigned-contacts")[cardIndex].innerHTML += renderAssignedContactsToBoardCard(assignedContact, index);
    }
    cardIndex++;
  }
}

function hideSubtasksIfEmpty() {
  let subtasksRef = document.getElementsByClassName("board-card-subtasks");
  for (let i = 0; i < subtasksRef.length; i++) {
    if (subtasksRef[i].children[1].textContent === "0/0 Subtasks") {
      subtasksRef[i].style.display = "none";
    }
  }
}

function breakDescriptions() {
  let descriptionContainers = document.getElementsByClassName("board-card-description");
  for (let i = 0; i < descriptionContainers.length; i++) {
    let description = descriptionContainers[i].querySelector("p").textContent;
    description = description.slice(0, 50) + "...";
    descriptionContainers[i].textContent = description;
}
}

//-- drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function startDrag(id) {
  currentDragedElement = id;
}

async function drop(status) {
  if (currentDragedElement !== null) {
    let task = createdTasks.find((task) => task.id === currentDragedElement);
    task.status = status;
    createdTasks.forEach((task) => {
      if (task.selectedContacts.length == 0) {
        task.selectedContacts = [""];
      }
      if (task.completedSubtasks.length == 0) {
        task.completedSubtasks = [""];
      }
      if (task.subtasks.length == 0) {
        task.subtasks = [""];
      }
    });
    await putData("tasks", createdTasks);
    await boardInit();
  }
  currentDragedElement = null;
}

/**
 * Filters and displays task cards on the board based on user input.
 * Hides all board cards initially and then selectively shows cards
 * whose titles include the search input text, ignoring case.
 */

function searchTask() {
  let searchInput = document
    .getElementById("findTaskInput")
    .value.toLowerCase();
  let boardCards = Array.from(document.getElementsByClassName("board-card"));
  boardCards.forEach((div) => {
    div.style.display = "none";
  });
  let filteredCards = boardCards.filter((div) =>
    div
      .querySelector("h3")
      ?.textContent.toLowerCase()
      .trim()
      .includes(searchInput)
  );
  filteredCards.forEach((div) => {
    div.style.display = "block";
  });
}

//-- add task overlay
function openAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  // renderTaskOverlayContent(); 
  addTaskOverlayRef.classList.remove("d-none");
  addTaskOverlayRef.style.pointerEvents = "all";
  setTimeout(() => {
    addTaskOverlayRef.classList.add("active");
    addTaskOverlayContentRef.style.left = "calc(50% - 482px)";
  }, 50);
  changeMediumBtn();
}

function renderTaskOverlayContent() {
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayContentRef.innerHTML = addTaskOverlayBoardTemplate();
  toggleSubtasks();
  renderAssignedContacts();
  renderContactsDropdown();
  openAddTaskOverlay();
}

function renderContactsDropdown() {
  let dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.innerHTML = contacts.map(contact => `
    <div onclick="selectContact('${contact.name}')">${contact.name}</div>
  `).join('');
}

function addTaskOverlayBoardTemplate() {
  return ` <div class="addTask-header-and-input">
            <div class="addTask-header">
                <h1>Add Task</h1>
                <div onclick="closeAddTaskOverlay(event)" id="closeBtn" class="close-btn"><img
                        src="./assets/img/close-btn.png" alt=""></div>
            </div>
            <div class="addTask-wrapper">

                <div class="addTask-left">
                    <div class="addTask-section addTask-title">
                        <label style="display: flex;" for="">
                            <p>Title</p>
                            <p style="color: red;">*</p>
                        </label>
                        <input onclick="addRequiredTitle(this)" oninput="addRequiredTitle(this)"
                            class="add-task-input-field" placeholder="Enter a title" type="text">
                        <div class="required-text">
                            <span id="requiredTitle" class="d-none">This field is required</span>
                        </div>
                    </div>

                    <div class="addTask-section addTask-description">
                        <label for="">
                            <p>Description</p>
                        </label>
                        <textarea class="description-area add-task-input-field"></textarea>

                    </div>

                    <div class=" addTask-section addTask-assignedTo">
                        <label for="">
                            <p>Assigned to</p>
                        </label>
                        <div id="assigned-to-input">
                            <input oninput="filterDropdownItems()" class="add-task-input-field placeholder-color" type="text" id="assigned-to-field"
                                placeholder="Select contacts to assign"
                                onclick="toggleDropdown(); toggleAssignToIconSrc(); ">
                            <div onclick="toggleDropdown(); toggleAssignToIconSrc();"
                                class="input-icon-assign-to-container">
                                <img id="input-icon-assign-to" src="./assets/svg/addTasksSvg/arrow_drop_down.svg"
                                    alt="Icon" class="input-icon">
                            </div>
                            <div class="dropdown-content" id="dropdown-content">

                            </div>
                        </div>

                        <section id="assigned-circles-section" class="assigned-circles-section">

                        </section>

                    </div>


                </div>

                <div class="add-task-vl"></div>

                <div class="addTask-right">

                    <div class="addTask-section task-date">
                        <label style="display: flex;" for="">
                            <p>Due date</p>
                            <p style="color: red;">*</p>
                        </label>
                        <input id="dueDateInputField" onclick="addRequiredDate(this)" oninput="addRequiredDate(this)"
                            class="add-task-input-field" type="date" style="color: #ccc;">
                        <div class="required-text">
                            <span id="requiredDate" class="d-none">This field is required</span>
                        </div>
                    </div>

                    <div class="addTask-section addTask-prio">
                        <label for="">
                            <p>Prio</p>
                        </label>
                        <div class="prio-buttons">
                            <button onclick="changeUrgentBtn()" id="urgent-btn" class="urgent prio-btn-urgent">Urgent
                                <img id="urgent-img" src="" alt=""></button>
                            <button onclick="changeMediumBtn()" id="medium-btn" class="medium prio-btn-medium">Medium
                                <img id="medium-img" src="" alt=""></button>
                            <button onclick="changeLowBtn()" id="low-btn" class="prio-btn-low">Low <img id="low-img"
                                    src="" alt=""></button>
                        </div>
                    </div>

                    <div class="addTask-section addTask-category">
                        <label style="display: flex;" for="">
                            <p>Category</p>
                            <p style="color: red;">*</p>
                        </label>
                        <div class="category-input" onclick="toggleCategoryDropdown()">
                            <input id="category-field" class="placeholder-color" value="Select task category"
                                type="text" readonly>
                            <div class="input-icon-category-container">
                                <img id="input-icon-category" src="./assets/svg/addTasksSvg/arrow_drop_down.svg"
                                    alt="Icon" class="input-icon-category">
                            </div>
                        </div>
                        <!-- </div> -->

                        <div class="addTask-subtasks">
                            <label for="">
                                <p>Subtasks</p>
                            </label>
                            <div class="addTask-sectio subtask-section"><input
                                                onclick="cancelEditSubtaskItem();" class="add-task-input-field"
                                                type="text" placeholder="Add new subtask" maxlength="30"><img
                                                class="subtask-add" src="./assets/img/addTask/add.svg" alt=""
                                                onclick="focusSubtaskInput()">
                                            <div class="cancel-check-btn"><img class="subtask-cancel" a
                                                    onclick="cancelSubInput()" src="./assets/img/addTask/cross.svg"
                                                    alt=""><img class="subtask-check"
                                                    src="./assets/img/addTask/check.svg" alt=""
                                                    onclick="renderSubtaskList()"></div>

                                        </div>



                            <section id="subtasksList" class="subtask-list"></section>


                            <section id="edit-subtask-item-field" class="edit-subtask-item">
                                <input id="subtask-edit-input" class="subtask-edit-input" value="" type="text" name=""
                                    id="" maxlength="30">
                                <div class="edit-subtask-btns"><img onclick="deleteSubInputValue()"
                                        src="./assets/svg/contacts_svg/delete.svg" alt=""><img
                                        onclick="confirmSubEdit()" src="./assets/img/addTask/check.svg" alt="">
                                </div>
                            </section>

                        </div>

                        <section id="category-dropdown" class="category-dropdown">
                            <div onclick="setCategory(technicalTask)" class="technicalTask-btn category-btn ">
                                <p>Technical Task</p>
                            </div>
                            <div onclick="setCategory(UserStory)" class="userStory-btn category-btn">
                                <p>User Story</p>
                            </div>
                        </section>




                    </div>


                </div>

            </div>

        </div>
        <div class="addTask-footer">
            <div><span style="color:red">*</span><span>This field is required</span></div>
            <div onclick="closeAddTaskOverlay(event)" class="display-flex clear-create"><button
                    onclick="clearInputFields()" class="clear-btn">Cancel
                    <img src="./assets/svg/addTasksSvg/clear.svg" alt=""></button><button onclick="createTaskOverlay()"
                    class="createTask-button">Create Task<img src="./assets/svg/addTasksSvg/cross.svg" alt="">
                </button></div>


        </div>`;}

/**
 * Closes the add task overlay.
 * Removes the active class, sets the content to move out of view to the right, and sets the pointer events to none.
 * Then, after a delay of 400ms, adds the d-none class to hide the overlay.
 */
function closeAddTaskOverlay() {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  addTaskOverlayRef.classList.remove("active");
  addTaskOverlayContentRef.style.left = "100%";
  addTaskOverlayRef.style.pointerEvents = "none";
  setTimeout(() => {
    addTaskOverlayRef.classList.add("d-none");
    addTaskOverlayContentRef.innerHTML = "";
  }, 400);
}

/**
 * Closes the add task overlay if the user clicks outside of it.
 * @param {Event} event - The event that triggered this function.
 */
function closeOverlayOutside(event) {
  let addTaskOverlayRef = document.getElementById("addTaskOverlay");
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlayContent");
  if (event.target == addTaskOverlayRef) {
    addTaskOverlayRef.classList.remove("active");
    addTaskOverlayRef.style.pointerEvents = "none";
    addTaskOverlayContentRef.style.left = "100%";
    setTimeout(() => {
      addTaskOverlayRef.classList.add("d-none");
      addTaskOverlayContentRef.innerHTML = "";
    }, 400);
  }
}

let editedSelectedContacts = [];

async function confirmTaskChanges(currentTitle) {
  getTaskOverlayInputs();
  let id = 0;
  for (let index = 0; index < createdTasks.length; index++) {
    createdTasks.forEach((task) => {
      if(id == task.id){
        id++;
      }
    }) 
  }
  let taskToEdit = createdTasks.find((task) => task.title == currentTitle);
  let taskIndex = createdTasks.indexOf(taskToEdit);
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  // for (let index = 0; index < selectedContacts.length; index++) {
  //   if (selectedContacts[index] == null) 
  //     delete selectedContacts[index]
  // }
  let editedTask = {
    "id": id, "status": taskToEdit.status, "title": title,
    "description": description,
    "selectedContacts": editedSelectedContacts.length > 0 ? editedSelectedContacts : selectedContacts,
    "dueDate": dueDate, "priority": priority, "selectedCategory": taskToEdit.selectedCategory,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": taskToEdit.completedSubtasks.length > 0 ? taskToEdit.completedSubtasks : [""]
  }
  createdTasks[taskIndex] = editedTask;
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  await boardInit();
  closeTaskCardOverlay();
}

function getTaskOverlayInputs() {
  title = document.querySelector(".addTask-title input").value;
  description = document.querySelector(".addTask-description textarea").value;
  dueDate = document.querySelector(".task-date input").value;
  items = Array.from(document.getElementsByClassName("subtask-item"));
}
/**
 * Clears the values of all input fields with the class "add-task-input-field".
 * Sets their "required" attribute to "false".
 * Invokes the changeMediumBtn function after clearing the inputs.
 */

function clearInputFields() {
  let inputFieldsRef = Array.from(
    document.getElementsByClassName("add-task-input-field")
  );
  inputFieldsRef.forEach((inputField) => {
    inputField.value = "";
    inputField.setAttribute("required", "false");
  });
  changeMediumBtn();
}

/**
 * Shows the notification for adding a task and clears all input fields.
 * The notification is removed after 2000ms.
 */
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
