const options = { year: "numeric", month: "long", day: "numeric" };
let deadlines = [];
let urgentTasks = [];
let greeting;

/**
 * Initializes the summary page by loading tasks and rendering all task-related information.
 * @async
 * @returns {Promise<void>}
 */
async function summaryInit() {
    await getTasks();
    renderTaskAmount();
    renderTaskFieldsAmount('tasksInProgress', 'inProgress');
    renderTaskFieldsAmount('awaitingFeedback', 'awaitFeedback');
    renderTaskFieldsAmount('toDo', 'toDo');
    renderTaskFieldsAmount('done', 'done');
    showAmountOfUrgentTasks();
    showUpcomingDeadline();
    await getQueryParamsUserName();
    await displayUserName();
    renderUserIconName();
}

/**
 * Renders the total number of tasks in the board.
 * @returns {void}
 */
function renderTaskAmount() {
    let tasksInBoard = document.getElementById("tasksInBoard");
    tasksInBoard.innerHTML = createdTasks.length;
}

/**
 * Renders the number of tasks for a specific status field.
 * @param {string} displayField - The ID of the HTML element where the count will be displayed.
 * @param {string} status - The status of tasks to count.
 * @returns {void}
 */
function renderTaskFieldsAmount(displayField, status) {
    let tasksInProgress = document.getElementById(displayField);
    tasksInProgress.innerHTML = createdTasks.filter(task => task.status === status).length;
}

/**
 * Counts and displays the number of urgent tasks.
 * @returns {void}
 */
function showAmountOfUrgentTasks() {
    let urgentAmountRef = document.getElementById("urgent");
    createdTasks.forEach((task) => {
        if (task.priority == "urgent") {
            urgentTasks.push(task.priority)
        }
    });
    urgentAmountRef.innerHTML = urgentTasks.length;
}

/**
 * Finds and displays the closest upcoming deadline from all tasks.
 * @returns {void}
 */
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

/**
 * Retrieves the logged-in user data and displays the appropriate greeting.
 * @async
 * @returns {Promise<void>}
 */
async function displayUserName() {
    loggedInUser = await getData("loggedInUser");
    getActuellTime();
    let greetingRef = document.getElementById("greeting");
    if (loggedInUser == "" || loggedInUser == null) {
        greetingRef.innerHTML = greeting;
        loggedInUser = "";
        return;
    }
    greetingRef.innerHTML = greeting + ", ";
    const userNameElement = document.getElementById("userName");
    userNameElement.textContent = decodeURIComponent(loggedInUser);
}

/**
 * Determines the appropriate greeting based on the current time of day.
 * @returns {void}
 */
function getActuellTime() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 12) {
        greeting = "Good morning";
    } else if (hours < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
}