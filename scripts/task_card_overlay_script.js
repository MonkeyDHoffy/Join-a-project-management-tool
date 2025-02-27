function taskCardOverlayTemplate(element) {
  return `
      <div id="task-card-big" class="task-card slide-in">
        <div class="badge">${element.selectedCategory}</div>
        <h2>${element.title.charAt(0).toUpperCase() + element.title.slice(1)}</h2>
        <div class="card-description">
          <span>${element.description}</span>
        </div>
        <p class="card-due-date"><strong>Due date:</strong> ${element.dueDate.replace(/-/g, '/')}</p>
        <p class="card-priority">
          <strong>Priority:</strong>
          <span class="priority-span">
            ${element.priority.charAt(0).toUpperCase() + element.priority.slice(1)}<img src="./assets/svg/addTasksSvg/${element.priority}.svg" alt="" />
          </span>
        </p>
  
        <div id="card-assigned">
          <strong>Assigned To:</strong>
        </div>
  
        <div class="card-subtasks">
          <strong>Subtasks:</strong>
          ${renderSubtasks(element)}
        </div>
  
        <div class="card-actions">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_282006_2518" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_282006_2518)">
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 4 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.4792 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.71667 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 4 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.4792 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.71667 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                  fill="#2A3647" />
              </g>
            </svg>
            <button onclick="deleteTaskCardOverlay('${element.title}')" class="delete card-btn">Delete</button>
          </div>
          <div class="div-border-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_282006_3798" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_282006_3798)">
                <path
                  d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                  fill="#2A3647" />
              </g>
            </svg>
            <button onclick='renderTaskEditOverlay(${JSON.stringify(element)})' class="edit card-btn"> Edit</button>
          </div>
        </div>
      </div>
    `;
}
//this function is used to render the subtasks of a task, mapping over the subtasks array and returning a string of html elements
// function renderSubtasks(element) {
//   return element.subtasks.map((subtask) => `
//     <label><input onclick="toggleSubtaskCompleted('${subtask}', this)" type="checkbox"> ${subtask}</label>`).join('');
// }

 async function toggleSubtaskCompleted(subtask, element) {
   let task = createdTasks.find((task) => task.subtasks.includes(subtask));
   if (!task.completedSubtasks.includes(subtask)) {
     task.completedSubtasks.push(subtask);
    //  element.checked = true;
   } else {
     task.completedSubtasks.splice(task.completedSubtasks.indexOf(subtask), 1);
    //  element.checked = false;
   }
   await putTasks();
   await boardInit();
 }

function renderSubtasks(element) {
  return element.subtasks.map((subtask) => {
    let isCompleted = element.completedSubtasks.includes(subtask);
    return `
      <label>
        <input
          onclick="toggleSubtaskCompleted('${subtask}', this)"
          type="checkbox"
          ${isCompleted ? 'checked' : ''}
        />
        ${subtask}
      </label>
    `;
  }).join('');
}

// async function toggleSubtaskCompleted(subtask, element) {
//   let task = createdTasks.find((task) => task.subtasks.includes(subtask));
//   if (task) {
//     if (!task.completedSubtasks.includes(subtask)) {
//       task.completedSubtasks.push(subtask);
//       element.checked = true;
//     } else {
//       task.completedSubtasks.splice(task.completedSubtasks.indexOf(subtask), 1);
//       element.checked = false;
//     }
//     try {
//       await putTasks(); 
//     } catch (error) {
//       console.error("Error updating subtask status in Firebase:", error);
//     }    
//   }
// }

function secondAssignedContactsTemplate(element, index, contact) {
  return `<div class="assignee">
            <span class="avatar" style="background-color: ${contact.color};">${contact.name.split(' ').map(word => word[0]).join('').toUpperCase()}</span>
            ${contact.name}
          </div>`;
}

function renderTaskCardOverlay(event) {
  let element = createdTasks.find((task) => task.title == event.querySelector("h3").innerHTML);
  let overlay = document.getElementById("task-card-overlay");
  overlay.innerHTML = taskCardOverlayTemplate(element);
  let assignedContacts = document.getElementById("card-assigned");
  overlay.classList.add("show");
  for (let index = 0; index < element.selectedContacts.length; index++) {
    let contact = contacts.find((contact) => contact.name == element.selectedContacts[index]);
    if (contact) {
      assignedContacts.innerHTML += secondAssignedContactsTemplate(element, index, contact);
    }
  }
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("show");
    }
  });
}

function closeTaskCardOverlay() {
  let taskCardOverlayRef = document.getElementById("task-card-overlay");
  taskCardOverlayRef.classList.remove("show"); 
}

async function deleteTaskCardOverlay(title) {
  let element = createdTasks.find((task) => task.title == title);
  createdTasks.splice(createdTasks.indexOf(element), 1);
  await putTasks();
  await boardInit();
  closeTaskCardOverlay();
}

// function renderTaskEditOverlay(element) {
//   let editField = document.querySelector(".task-card");
//   if (editField) {
//     editField.innerHTML = `   <div class="addTask-wrapper-edit-overlay">

//                             <div class="addTask-left-edit-overlay">
//                                 <div class="addTask-section addTask-title">
//                                     <label style="display: flex;" for="">
//                                         <p>Title</p>
                                  
//                                     </label>
//                                     <input onclick="addRequiredTitle(this)" oninput="addRequiredTitle(this)"
//                                         class="add-task-input-field" placeholder="Enter a title" type="text">
//                                     <div class="required-text">
//                                         <span id="requiredTitle" class="d-none">This field is required</span>
//                                     </div>
//                                 </div>

//                                 <div class="addTask-section addTask-description">
//                                     <label for="">
//                                         <p>Description</p>
//                                     </label>
//                                     <textarea class="description-area add-task-input-field"></textarea>

//                                 </div>

//                                 <div class=" addTask-section addTask-assignedTo">
//                                     <label for="">
//                                         <p>Assigned to</p>
//                                     </label>
//                                     <div id="assigned-to-input">
//                                         <input class="add-task-input-field placeholder-color" type="text"
//                                             id="assigned-to-field" placeholder="Select contacts to assign"
//                                             onclick="toggleDropdown(); toggleAssignToIconSrc(); ">
//                                         <div onclick="toggleDropdown(); toggleAssignToIconSrc();"
//                                             class="input-icon-assign-to-container">
//                                             <img id="input-icon-assign-to"
//                                                 src="./assets/svg/addTasksSvg/arrow_drop_down.svg" alt="Icon"
//                                                 class="input-icon">
//                                         </div>
//                                         <div class="dropdown-content" id="dropdown-content">

//                                         </div>
//                                     </div>

//                                     <section id="assigned-circles-section" class="assigned-circles-section">

//                                     </section>

//                                 </div>


//                             </div>

//                             <div class="add-task-vl"></div>

//                             <div class="addTask-right-edit-overlay">

//                                 <div class="addTask-section task-date">
//                                     <label style="display: flex;" for="">
//                                         <p>Due date</p>
                                       
//                                     </label>
//                                     <input id="dueDateInputField" onclick="addRequiredDate(this)"
//                                         oninput="addRequiredDate(this)" class="add-task-input-field" type="date"
//                                         style="color: #ccc;">
//                                     <div class="required-text">
//                                         <span id="requiredDate" class="d-none">This field is required</span>
//                                     </div>
//                                 </div>

//                                 <div class="addTask-section addTask-prio">
//                                     <label for="">
//                                         <p>Prio</p>
//                                     </label>
//                                     <div class="prio-buttons">
//                                         <button onclick="changeUrgentBtn()" id="urgent-btn"
//                                             class="urgent prio-btn-urgent">Urgent <img id="urgent-img" src=""
//                                                 alt=""></button>
//                                         <button onclick="changeMediumBtn()" id="medium-btn"
//                                             class="medium prio-btn-medium">Medium
//                                             <img id="medium-img" src="" alt=""></button>
//                                         <button onclick="changeLowBtn()" id="low-btn" class="prio-btn-low">Low <img
//                                                 id="low-img" src="" alt=""></button>
//                                     </div>
//                                 </div>

//                                 <div class="addTask-section addTask-category">
//                                     <label style="display: flex;" for="">
//                                         <p>Category</p>
                                      
//                                     </label>
//                                     <div class="category-input" onclick="toggleCategoryDropdown()">
//                                         <input id="category-field" class="placeholder-color"
//                                             value="Select task category" type="text" readonly>
//                                         <div class="input-icon-category-container">
//                                             <img id="input-icon-category"
//                                                 src="./assets/svg/addTasksSvg/arrow_drop_down.svg" alt="Icon"
//                                                 class="input-icon-category">
//                                         </div>
//                                     </div>
//                                     <!-- </div> -->

//                                     <div class="addTask-subtasks">
//                                         <label for="">
//                                             <p>Subtasks</p>
//                                         </label>
//                                         <div class="addTask-sectio subtask-section"><input
//                                                 onclick="cancelEditSubtaskItem();" class="add-task-input-field"
//                                                 type="text" placeholder="Add new subtask" maxlength="30"><img
//                                                 class="subtask-add" src="./assets/img/addTask/add.svg" alt=""
//                                                 onclick="focusSubtaskInput()">
//                                             <div class="cancel-check-btn"><img class="subtask-cancel" a
//                                                     onclick="cancelSubInput()" src="./assets/img/addTask/cross.svg"
//                                                     alt=""><img class="subtask-check"
//                                                     src="./assets/img/addTask/check.svg" alt=""
//                                                     onclick="renderSubtaskList()"></div>

//                                         </div>


//                                         <section id="subtasksList" class="subtask-list"></section>


//                                         <section id="edit-subtask-item-field" class="edit-subtask-item">
//                                             <input id="subtask-edit-input" class="subtask-edit-input" value=""
//                                                 type="text" name="" id="" maxlength="30">
//                                             <div class="edit-subtask-btns"><img onclick="deleteSubInputValue()"
//                                                     src="./assets/svg/contacts_svg/delete.svg" alt=""><img
//                                                     onclick="confirmSubEdit()" src="./assets/img/addTask/check.svg"
//                                                     alt="">
//                                             </div>
//                                         </section>

//                                     </div>

//                                     <section id="category-dropdown" class="category-dropdown">
//                                         <div onclick="setCategory(technicalTask)"
//                                             class="technicalTask-btn category-btn ">
//                                             <p>Technical Task</p>
//                                         </div>
//                                         <div onclick="setCategory(UserStory)" class="userStory-btn category-btn">
//                                             <p>User Story</p>
//                                         </div>
//                                     </section>




//                                 </div>


//                             </div>

//                         </div>`;
    
//   }
// }



function renderTaskEditOverlay(element) {
  let editField = document.querySelector(".task-card");
  if (editField) {
    editField.innerHTML = `
      <div class="addTask-wrapper addTask-wrapper-edit-overlay">
        <div class="addTask-left-edit-overlay">
          <div class="addTask-section addTask-title">
            <label style="display: flex;" for="">
              <p>Title</p>
            </label>
            <input
              onclick="addRequiredTitle(this)"
              oninput="addRequiredTitle(this)"
              class="add-task-input-field"
              placeholder="Enter a title"
              type="text"
              value="${element.title}"
            />
            <div class="required-text">
              <span id="requiredTitle" class="d-none">This field is required</span>
            </div>
          </div>

          <div class="addTask-section addTask-description">
            <label for="">
              <p>Description</p>
            </label>
            <textarea class="description-area add-task-input-field">${element.description || ''}</textarea>
          </div>

          <div class="addTask-section addTask-assignedTo">
            <label for="">
              <p>Assigned to</p>
            </label>
            <div id="assigned-to-input">
              <input
                class="add-task-input-field placeholder-color"
                type="text"
                id="assigned-to-field"
                placeholder="Select contacts to assign"
                onclick="toggleDropdown(); toggleAssignToIconSrc();"
              />
              <div onclick="toggleDropdown(); toggleAssignToIconSrc();" class="input-icon-assign-to-container">
                <img
                  id="input-icon-assign-to"
                  src="./assets/svg/addTasksSvg/arrow_drop_down.svg"
                  alt="Icon"
                  class="input-icon"
                />
              </div>
              <div class="dropdown-content" id="dropdown-content"></div>
            </div>

            <section id="assigned-circles-section" class="assigned-circles-section"></section>
          </div>
        </div>

        <div class="add-task-vl"></div>

        <div class="addTask-right-edit-overlay">
          <div class="addTask-section task-date">
            <label style="display: flex;" for="">
              <p>Due date</p>
            </label>
            <input
              id="dueDateInputField"
              onclick="addRequiredDate(this)"
              oninput="addRequiredDate(this)"
              class="add-task-input-field"
              type="date"
              style="color: #ccc;"
              value="${element.dueDate || ''}"
            />
            <div class="required-text">
              <span id="requiredDate" class="d-none">This field is required</span>
            </div>
          </div>

          <div class="addTask-section addTask-prio">
            <label for="">
              <p>Prio</p>
            </label>
            <div class="prio-buttons">
              <button
                onclick="changeUrgentBtn()"
                id="urgent-btn"
                class="${element.priority === 'urgent' ? 'urgent-btn-active' : 'prio-btn-urgent'}"
              >
                Urgent <img id="urgent-img" src="${element.priority === 'urgent' ? './assets/svg/addTasksSvg/urgentactive.svg' : './assets/svg/addTasksSvg/urgent.svg'}" alt="" />
              </button>
              <button
                onclick="changeMediumBtn()"
                id="medium-btn"
                class="${element.priority === 'medium' ? 'medium-btn-active' : 'prio-btn-medium'}"
              >
                Medium <img id="medium-img" src="${element.priority === 'medium' ? './assets/svg/addTasksSvg/mediumactive.svg' : './assets/svg/addTasksSvg/medium.svg'}" alt="" />
              </button>
              <button
                onclick="changeLowBtn()"
                id="low-btn"
                class="${element.priority === 'low' ? 'low-btn-active' : 'prio-btn-low'}"
              >
                Low <img id="low-img" src="${element.priority === 'low' ? './assets/svg/addTasksSvg/lowactive.svg' : './assets/svg/addTasksSvg/low.svg'}" alt="" />
              </button>
            </div>
          </div>

          <div class="addTask-section addTask-category">

            <div class="addTask-subtasks">
              <label for="">
                <p>Subtasks</p>
              </label>
              <div class="addTask-sectio subtask-section">
                <input
                  onclick="cancelEditSubtaskItem();"
                  class="add-task-input-field"
                  type="text"
                  placeholder="Add new subtask"
                  maxlength="30"
                /><img class="subtask-add" src="./assets/img/addTask/add.svg" alt="" onclick="focusSubtaskInput()" />
                <div class="cancel-check-btn">
                  <img class="subtask-cancel" a onclick="cancelSubInput()" src="./assets/img/addTask/cross.svg" alt="" /><img
                    class="subtask-check"
                    src="./assets/img/addTask/check.svg"
                    alt=""
                    onclick="renderSubtaskList()"
                  />
                </div>
              </div>

              <section id="subtasksList" class="subtask-list">${renderSubtasks(element)}</section>

              <section id="edit-subtask-item-field" class="edit-subtask-item">
                <input id="subtask-edit-input" class="subtask-edit-input" value="" type="text" name="" id="" maxlength="30" />
                <div class="edit-subtask-btns">
                  <img onclick="deleteSubInputValue()" src="./assets/svg/contacts_svg/delete.svg" alt="" /><img
                    onclick="confirmSubEdit()"
                    src="./assets/img/addTask/check.svg"
                    alt=""
                  />
                </div>
              </section>
            </div>

            <section id="category-dropdown" class="category-dropdown">
              <div onclick="setCategory(technicalTask)" class="technicalTask-btn category-btn">
                <p>Technical Task</p>
              </div>
              <div onclick="setCategory(UserStory)" class="userStory-btn category-btn">
                <p>User Story</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }
}