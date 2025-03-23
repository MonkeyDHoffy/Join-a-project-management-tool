/**
 * Generates HTML template for a task card
 * @param {Object} element - The task object containing task details
 * @param {number} element.id - The unique identifier of the task
 * @param {string} element.selectedCategory - The category of the task
 * @param {string} element.title - The title of the task
 * @param {string} element.description - The description of the task
 * @param {Array} element.completedSubtasks - Array of completed subtasks
 * @param {Array} element.subtasks - Array of all subtasks
 * @param {string} element.priority - Priority level of the task
 * @returns {string} HTML string representing the task card
 */
function taskCardTemplate(element) {
  return ` <div onclick="renderTaskCardOverlay(this)" ondragstart="startDrag(${element.id})" draggable="true" class="board-card">                              
                                    <div class="card-header"><div class="color-${element.selectedCategory.replace(" ", "-")}">${element.selectedCategory}</div><img onclick="openDragMenu()" src="./assets/img/res_drop_btn.png" alt=""></div>
  
                                    <h3>${element.title}</h3>                            
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                                <div class="board-card-subtasks">
                                    <progress value="${element.completedSubtasks.length}" max="${element.subtasks.length}"></progress>
                                    <span class="subtasks-progress">${element.completedSubtasks.length}/${element.subtasks.length} Subtasks</span>
                                </div>
                                <div class="board-contacts-and-priority">
                                    <div class="board-card-assigned-contacts"></div>
                                    <div class="board-card-priority"> <img src="./assets/svg/addTasksSvg/${element.priority}.svg" alt=""></div>
                                </div>
                            </div>`;
}

/**
 * Generates HTML for assigned contacts displayed on board cards
 * @param {Object} assignedContact - Contact object with name and color properties
 * @param {string} assignedContact.name - Name of the contact
 * @param {string} assignedContact.color - Background color code for the contact's avatar
 * @param {number} index - Index position used for calculating horizontal offset
 * @returns {string} HTML string representing the contact avatar or empty string if contact is null
 */
function renderAssignedContactsToBoardCard(assignedContact, index) {
    if (!assignedContact) {
        return "";
    }
    return ` <div style="background-color:${assignedContact.color}; transform: translateX(-${index * 7}px);" class="contact-profile-picture-board">
                ${assignedContact.name.split(' ').map(word => word[0]).join('').toUpperCase()}
            </div> `
}

/**
 * Generates HTML template for empty task columns
 * @param {number} i - Index of the task status to display
 * @returns {string} HTML string for the empty task placeholder
 */
function noTasksTemplate(i) {
  return `  <div draggable="true" class="no-tasks">
                <span>No tasks ${taskStatus[i]}</span>
            </div>`;
}

/**
 * Generates HTML template for the add task overlay on the board
 * @returns {string} Complete HTML structure for add task form overlay
 */
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
  
          </div>`;
}


