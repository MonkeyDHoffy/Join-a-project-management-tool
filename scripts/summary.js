function summaryInit() {
    renderTaskAmount();
    renderTasksInProgress();
    renderTasksAwaitingFeedback();
    renderToDos();
    renderDone();
    displayUserName();
}

function renderTaskAmount() {
    let tasksInBoard = document.getElementById("tasksInBoard");
    tasksInBoard.innerHTML = tasks.length;
}

function renderTasksInProgress() {
    let tasksInProgress = document.getElementById("tasksInProgress");
    tasksInProgress.innerHTML = tasks.filter(task => task.status === "inProgress").length;
}

function renderTasksAwaitingFeedback() {
    let awaitingFeedback = document.getElementById("awaitingFeedback");
    awaitingFeedback.innerHTML = tasks.filter(task => task.status === "awaitFeedback").length;
}

function renderToDos() {
    let toDo = document.getElementById("toDo");
    toDo.innerHTML = tasks.filter(task => task.status === "toDo").length;
}

function renderDone() {
    let done = document.getElementById("done");
    done.innerHTML = tasks.filter(task => task.status === "done").length;
}