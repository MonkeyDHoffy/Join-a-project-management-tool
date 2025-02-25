function taskCardTemplate(element) {
  return ` <div onclick="renderTaskCardOverlay()" ondragstart="startDrag(${element.id})" draggable="true" class="board-card">                              
                                    <div class="color-${element.selectedCategory.replace(" ", "-")}">${element.selectedCategory}</div>
  
                                    <h3>${element.title}</h3>                            
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                                <div class="board-card-subtasks">
                                    <progress value="${element.completedSubtasks.length}" max="${element.subtasks.length}"></progress>
                                </div>
                                <div class="board-card-assigned-contacts">
                                    
                                </div>
                            </div>`;
}

function renderAssignedContactsToBoardCard(assignedContact, index) {
    if (!assignedContact) {
        return "";
    }
    return ` <div style="background-color:${assignedContact.color}; transform: translateX(-${index * 10}px);"  class="contact-profile-picture">
                                    ${assignedContact.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                                    </div> `
}

function noTasksTemplate(i) {
  return `<div draggable="true" class="no-tasks">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`;
}


