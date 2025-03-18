const BASE_URL = "https://remotestorage-f4b14-default-rtdb.europe-west1.firebasedatabase.app/";
let data;
let users = [];
let createdTasks = [];
let contacts = [];
let loggedInUser;
const colors = [
  "--orange",
  "--pink",
  "--purple",
  "--violet",
  "--cyan",
  "--green",
  "--peach",
  "--blue",
  "--lime",
  "--yellow",
  "--gold",
  "--coral",
  "--red",
  "--magenta",
  "--light-orange",
];

/**
 * Fetches data from the Firebase database.
 * @param {string} path - The path to the data in the database.
 * @returns {Promise<Object|Array>} The requested data in JSON format.
 */
async function getData(path = "") {
  try {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Updates data in the Firebase database.
 * @param {string} path - The path to the data in the database.
 * @param {Object|Array} data - The data to be stored.
 * @returns {Promise<void>}
 */
async function putData(path = "", data = "") {
  try {
    let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves tasks from the database and normalizes their structure.
 * @returns {Promise<void>}
 */
async function getTasks() {
  createdTasks = Object.values(await getData("tasks")) || [];
  if (createdTasks[0] == "") {
    createdTasks = [];
  } else {
    createdTasks.forEach((task) => {
      if (task.selectedContacts[0] === "") {
        task.selectedContacts = [];
      }
      if (task.completedSubtasks[0] === "") {
        task.completedSubtasks = [];
      }
      if (task.subtasks[0] === "") {
        task.subtasks = [];
      }
    });
  }
}

/**
 * Prepares tasks for Firebase storage and updates the database.
 * @returns {Promise<void>}
 */
async function putTasks() {
  if (createdTasks.length == 0) {
    createdTasks = [""];
  } else {
    createdTasks.forEach((task) => {
      if (task.selectedContacts.length == 0) {
        task.selectedContacts = [""];
      }
      if (task.completedSubtasks.length == 0) {
        task.completedSubtasks = [""];
      }
      if (task.subtasks.length == 0) {
        task.subtasks = [""];
      }
    });
  }
  await putData("tasks", createdTasks);
}

/**
 * Fetches all users from the database.
 * @returns {Promise<void>}
 */
async function getUsers() {
  users = Object.values(await getData("users"));
}

/**
 * Retrieves the username from URL query parameters and stores it in the database.
 * @returns {Promise<string|undefined>} The username from query parameters if available.
 */
async function getQueryParamsUserName() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('name');
  if (userName !== null) {
  await putData("loggedInUser", userName);
  return userName;
  }
}

/**
 * Renders the user icon with the initials of the logged-in user.
 * @returns {Promise<void>}
 */
async function renderUserIconName() {
  loggedInUser = await getData("loggedInUser");
  let userIcon = document.getElementById("userIcon");
  if (loggedInUser == "" || loggedInUser == undefined) {
    userIcon.innerHTML = "G";
  }else {
    userIcon.innerHTML = loggedInUser.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}

/**
 * Logs out the current user and redirects to the login page.
 * @returns {Promise<void>}
 */
async function logOut() {
  loggedInUser = "";
  await putData("loggedInUser", loggedInUser);
  window.location.href = "./index.html";
}

/**
 * Fetches all contacts from the database and sorts them alphabetically by name.
 * @returns {Promise<void>}
 */
async function getContacts() {
  contacts = Object.values(await getData("contacts/"));
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Toggles the visibility of the menu.
 */
function toggleMenu() {
  let menu = document.querySelector(".menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/**
 * Initializes event listeners for document clicks to handle closing the menu
 * when clicking outside of it.
 */
function initMenuCloseHandling() {
  document.addEventListener('click', function(event) {
    let menu = document.querySelector('.menu');
    let userIcon = document.getElementById('userIcon');
    if (menu && menu.style.display === 'block' && 
        !menu.contains(event.target) && 
        event.target !== userIcon && 
        !userIcon.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', initMenuCloseHandling);


