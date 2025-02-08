function taskCardTemplate(element) {
    return ` <div ondragstart="startDrag(${element.id})" draggable="true" class="board-card">                              
                                    <h3>${element.title}</h3>                            
                                <div class="board-card-description">
                                    <p>Card description</p>
                                </div>
                            </div>`
}

function noTasksTemplate(i) {
    return `<div draggable="false" class="no-tasks">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`
}