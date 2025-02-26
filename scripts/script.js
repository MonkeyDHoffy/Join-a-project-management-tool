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
  createdTasks = (await getData("tasks")) || [];
}

async function getUsers() {
  users = Object.values(await getData("users"));
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
