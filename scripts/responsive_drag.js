function openDragMenu(event, id, statusId) {
    event.stopPropagation();
    taskStatus.splice(statusId, 1);
    let dragMenu = document.getElementById(`drag-menu-${id}`);
    dragMenu.innerHTML = dragMenuTemplate(id, taskStatus);
    dragMenu.style.display = 'block';
  }
  
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
   * Bewegt einen Task in eine andere Statusspalte via Klick (für mobile Ansicht)
   * @param {string} status - Der Zielstatus des Tasks (toDo, inProgress, awaitFeedback, done)
   * @param {number} id - Die ID des zu bewegenden Tasks
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
   * Zeigt eine kleine Benachrichtigung an, wenn ein Task verschoben wurde
   * @param {string} status - Der Zielstatus, in den der Task verschoben wurde
   */
  let statusNames = {
    'toDo': 'To do',
    'inProgress': 'In progress',
    'awaitFeedback': 'Await feedback',
    'done': 'Done'
  };
  
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
   * Generiert das HTML-Template für das Drag-Menü mit korrekten Pfeilrichtungen
   * @param {number} id - Die ID des Tasks
   * @returns {string} HTML-Template für das Drag-Menü
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