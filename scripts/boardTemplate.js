function taskCardTemplate(element) {
  return ` <div onclick="renderTaskCardOverlay()" ondragstart="startDrag(${element.id})" draggable="true" class="board-card">                              
                                    <h3>${element.title}</h3>                            
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                            </div>`;
}

function noTasksTemplate(i) {
  return `<div draggable="true" class="no-tasks">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`;
}
