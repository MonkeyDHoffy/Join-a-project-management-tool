function taskCardTemplate(element) {
    return ` <div ondragstart="startDrag(${element.id})" draggable="true" class="board-card">
                                    <div class="category">
                                    <span>${element.category}</span>                          
                                    <h3>${element.title}</h3>                            
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                                <div class="board-card-description">
                                    <p>${element.description}</p>
                                </div>
                            </div>`
}

function noTasksTemplate(i) {
    return `<div draggable="false" class="no-tasks" diabled="true">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`
}