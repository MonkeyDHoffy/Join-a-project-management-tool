function taskCardTemplate(element) {
    return ` <div ondragstart="startDrag(${element.id})" draggable="true" class="board-card">
                                <div class="board-card-title">
                                    <h3>${element.title}</h3>
                                </div>
                                <div class="board-card-description">
                                    <p>Card description</p>
                                </div>
                            </div>`
}

function noTasksTemplate(i) {
    return `<div class="no-tasks">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`
}