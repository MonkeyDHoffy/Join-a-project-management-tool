let taskStatus = ["to do", "in-progress", "await feedback", "done"]
let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'status': 'toDo'
}, {
    'id': 1,
    'title': 'Kochen',
    'status': 'inProgress'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'status': 'awaitFeedback'
},
];
let currentDragedElement;



function updateHTML() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function renderToDo() {
    let toDo = tasks.filter(task => task.status === 'toDo');
    document.getElementById('toDo').innerHTML = '';
    if (toDo.length === 0) {
        document.getElementById('toDo').innerHTML += noTasksTemplate(0);
    }
    for (let i = 0; i < toDo.length; i++) {
        document.getElementById('toDo').innerHTML += taskCardTemplate(toDo[i]);
    }
}

function renderInProgress() {
    let inProgress = tasks.filter(task => task.status === 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    if (inProgress.length === 0) {
        document.getElementById('inProgress').innerHTML += noTasksTemplate(1);
    }
    for (let i = 0; i < inProgress.length; i++) {
        document.getElementById('inProgress').innerHTML += taskCardTemplate(inProgress[i]);
    }
}

function renderAwaitFeedback() {
    let awaitFeedback = tasks.filter(task => task.status === 'awaitFeedback');
    document.getElementById('awaitFeedback').innerHTML = '';
    if (awaitFeedback.length === 0) {
        document.getElementById('awaitFeedback').innerHTML += noTasksTemplate(2);
    }
    for (let i = 0; i < awaitFeedback.length; i++) {
        document.getElementById('awaitFeedback').innerHTML += taskCardTemplate(awaitFeedback[i]);
    }
}

function renderDone() {
    let done = tasks.filter(task => task.status === 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length === 0) {
        document.getElementById('done').innerHTML += noTasksTemplate(3);
    }
    for (let i = 0; i < done.length; i++) {
        document.getElementById('done').innerHTML += taskCardTemplate(done[i]);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDrag(id) {
    currentDragedElement = id;
}

function drop(status) {
    let task = tasks.find(task => task.id === currentDragedElement);
    task.status = status;
    updateHTML();
}

/**
 * Filters and displays task cards on the board based on user input.
 * Hides all board cards initially and then selectively shows cards
 * whose titles include the search input text, ignoring case.
 */

function searchTask() {
    let searchInput = document.getElementById('findTaskInput').value.toLowerCase();
    let boardCards = Array.from(document.querySelectorAll(".board-card"));
    boardCards.forEach(div => {div.style.display = 'none';});
    let filteredCards = boardCards.filter(div => 
        div.querySelector("h3")?.textContent.toLowerCase().trim().includes(searchInput));
    filteredCards.forEach(div => {div.style.display = 'block';});
}