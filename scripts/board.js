let taskStatus = ["to do", "in-progress", "await feedback", "done"]

function renderTasks() {
    let boardFieldRef = document.getElementsByClassName("board-field");
    for (let i = 0; i < boardFieldRef.length; i++) {
        if (boardFieldRef[i].innerHTML === "") {
            boardFieldRef[i].innerHTML = noTasksTemplate(i)
        }
    }
}

function noTasksTemplate(i) {
    return `<div class="no-tasks">
                            <span>No tasks ${taskStatus[i]}</span>
                        </div>`
}