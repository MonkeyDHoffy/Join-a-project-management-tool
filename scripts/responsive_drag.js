  /**
   * Opens the drag menu for a task when the arrow button is clicked.
   * Removes the current status from the list of available statuses and
   * renders the drag menu with the remaining statuses.
   * @param {Event} event - The event object of the click event.
   * @param {number} id - The ID of the task for which the menu is opened.
   * @param {number} statusId - The ID of the current status of the task.
   */
function openDragMenu(event, id, statusId) {
    event.stopPropagation();
    taskStatus.splice(statusId, 1);
    let dragMenu = document.getElementById(`drag-menu-${id}`);
    dragMenu.innerHTML = dragMenuTemplate(id, taskStatus);
    dragMenu.style.display = 'block';
  }
  
  /**
   * Closes all drag menus that are not the currently clicked element.
   * @param {Event} event - The event object of the click event.
   */
  function closeDragMenu(event) {
    event.stopPropagation();
    let dragmenus = document.getElementsByClassName('drag-menu');
    let moveToMenus = document.getElementsByClassName('move-to');
    for (let index = 0; index < dragmenus.length; index++) {
      if (event.target !== dragmenus[index] || event.target !== moveToMenus[index]) {
        dragmenus[index].style.display = 'none';
      }
    }
  }
  
  /**
   * Moves a task to a different status column via click (for mobile view)
   * @param {string} status - The target status of the task (toDo, inProgress, awaitFeedback, done)
   * @param {number} id - The ID of the task to be moved
   */
  async function moveTaskTo(event, status, id) {
    event.stopPropagation();
    let taskToMove = createdTasks.find(task => task.id === id);
    if (taskToMove) {
      taskToMove.status = status;
      let dragMenu = document.getElementById(`drag-menu-${id}`);
      if (dragMenu) {
        dragMenu.style.display = 'none';
      }
      await putTasks();
      await boardInit();
      showMoveNotification(status);
    }
  }
  
  /**
   * Shows a small notification when a task is moved
   * @param {string} status - The target status the task is moved to
   */
  let statusNames = {
    'toDo': 'To do',
    'inProgress': 'In progress',
    'awaitFeedback': 'Await feedback',
    'done': 'Done'
  };
  
  /**
   * Shows a small notification when a task is moved
   * @param {string} status - The target status the task is moved to
   * @description
   * Creates a small notification div and appends it to the document body.
   * After 2 seconds, the notification is removed.
   */
  function showMoveNotification(status) {
    let displayStatus = statusNames[status] || status;
    let notification = document.createElement('div');
    notification.className = 'move-notification';
    notification.innerHTML = `Task moved to <strong>${displayStatus}</strong>`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2000);
  }
  

  /**
   * Finds a task by its ID in the createdTasks array.
   * @param {number} id - The ID of the task to find.
   * @returns {Object} The task with the given ID if found, undefined otherwise.
   */
   function findTaskById(id) {
     let taskToMove;
     for (let i = 0; i < createdTasks.length; i++) {
       if (createdTasks[i].id === id) {
         taskToMove = createdTasks[i];
         break;
       }
     }
     return taskToMove;
   }
   let allStatusOptions = [
     { id: 'toDo', label: 'To do', icon: 'arrow_upward.png' },
     { id: 'inProgress', label: 'In progress', icon: 'arrow_downward.png' },
     { id: 'awaitFeedback', label: 'Await feedback', icon: 'arrow_downward.png' },
     { id: 'done', label: 'Done', icon: 'arrow_downward.png' }
   ];
  
/**
 * Determines the direction icon based on the relative position of the target status
 * compared to the current status in the task workflow.
 * 
 * @param {string} currentStatus - The current status of the task (e.g., 'toDo', 'inProgress', etc.).
 * @param {string} targetStatus - The target status to move the task to.
 * @returns {string} The filename of the icon representing the direction of movement 
 *                   ('arrow_upward.png' for moving to an earlier status, 
 *                   'arrow_downward.png' for moving to a later status).
 */
  function getDirectionIcon(currentStatus, targetStatus) {
    let statusOrder = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    let currentIndex = statusOrder.indexOf(currentStatus);
    let targetIndex = statusOrder.indexOf(targetStatus);
    if (targetIndex < currentIndex) {
      return 'arrow_upward.png';
    } 
    else {
      return 'arrow_downward.png';
    }
  }
  
  /**
 * Generates the HTML template for the drag menu with correct arrow directions
 * @param {number} id - The ID of the task
 * @returns {string} HTML template for the drag menu
 */
  function dragMenuTemplate(id) {
    let taskToMove = findTaskById(id);
    if (!taskToMove) {
      return '<div class="move-to"><p>Move to</p><p>No options available</p></div>';
    }
    let currentStatus = taskToMove.status;
    let optionsHTML = '';
    for (let i = 0; i < allStatusOptions.length; i++) {
      let option = allStatusOptions[i]; 
      if (option.id !== currentStatus) {
        let arrowIcon = getDirectionIcon(currentStatus, option.id);
        optionsHTML += `
          <div class="option" onclick="moveTaskTo(event, '${option.id}', ${id})">
            <img src="./assets/img/${arrowIcon}" alt="${option.label}">
            <span>${option.label}</span>
          </div>
        `;
      }
    }
    return `
      <div onclick="closeDragMenu(event)" class="move-to">
        <p>Move to</p>
        ${optionsHTML}
      </div>
    `;
  }