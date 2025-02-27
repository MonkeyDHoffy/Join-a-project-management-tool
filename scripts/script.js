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
const BASE_URL = "https://remotestorage-f4b14-default-rtdb.europe-west1.firebasedatabase.app/";
let data;
let users = [];
let createdTasks = [];
let contacts = [];

async function getData(path = "") {
  try {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
  } catch (error) {
    console.error(error);
  }
}

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
    console.log(responseToJson);
  } catch (error) {
    console.error(error);
  }
}

// ?????? without this code tasks disappeared in the firebase....?!?!
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

async function getUsers() {
  users = Object.values(await getData("users"));
}

function getQueryParamsUserName() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('name');
  console.log(urlParams.get('name'));
  return userName;
}

function displayUserName() {
  const userName = getQueryParamsUserName();
  const userNameElement = document.getElementById("userName");
  userNameElement.textContent = decodeURIComponent(userName);
}

// function regsterUser() {
//     let name = "daniela";
//     let email = "daniela@example.com";
//     let passwort = "ertezrz";

async function getContacts() {
  contacts = Object.values(await getData("contacts/"));
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function toggleMenu() {
  let menu = document.querySelector(".menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// document.addEventListener('DOMContentLoaded', function() {
//   displayUserName();
// });
