const options = { year: "numeric", month: "long", day: "numeric" };
let deadlines = [];
let urgentTasks = [];

async function summaryInit() {
    await getTasks();
    renderTaskAmount();
    renderTaskFieldsAmount('tasksInProgress', 'inProgress');
    renderTaskFieldsAmount('awaitingFeedback', 'awaitFeedback');
    renderTaskFieldsAmount('toDo', 'toDo');
    renderTaskFieldsAmount('done', 'done');
    showAmountOfUrgentTasks();
    showUpcomingDeadline();
    displayUserName();
}

function renderTaskAmount() {
    let tasksInBoard = document.getElementById("tasksInBoard");
    tasksInBoard.innerHTML = createdTasks.length;
}

function renderTaskFieldsAmount(displayField, status) {
    let tasksInProgress = document.getElementById(displayField);
    tasksInProgress.innerHTML = createdTasks.filter(task => task.status === status).length;
}

function showAmountOfUrgentTasks() {
    let urgentAmountRef = document.getElementById("urgent");
    createdTasks.forEach((task) => {
        if (task.priority == "urgent") {
            urgentTasks.push(task.priority)
        }
    });
    urgentAmountRef.innerHTML = urgentTasks.length;
}

function showUpcomingDeadline() {
    let upcomingDeadlineRef = document.getElementById("deadline-date");
    deadlines = createdTasks.map(task => new Date(task.dueDate));
    deadlines.sort((a, b) => a - b);
    let upcomingDeadline = deadlines[0];
    if (upcomingDeadline) {
        upcomingDeadlineRef.innerHTML = upcomingDeadline.toLocaleDateString("en-US", options);
    } else {
        upcomingDeadlineRef.innerHTML = "No upcoming deadlines";
    }
}
