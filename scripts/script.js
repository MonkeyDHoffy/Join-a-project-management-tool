let tasks = [
  {
    id: 0,
    category: "user story",
    title: "Putzen",
    status: "toDo",
    assignedTo: "daniela",
    date: "01.01.2023",
    description: "Haus putzen",
    priority: "high",
    subtasks: ["hof kehren", "badezimmer putzen"],
  },
  {
    id: 1,
    title: "Kochen",
    status: "inProgress",
  },
  {
    id: 2,
    title: "Einkaufen",
    status: "awaitFeedback",
  },
  {
    id: 3,
    title: "Rasen mähen",
    status: "awaitFeedback",
  },
];

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

const BASE_URL =
  "https://remotestorage-f4b14-default-rtdb.europe-west1.firebasedatabase.app/";
let data;

let users = [];

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

async function getUsers() {
  users = Object.values(await getData("users"))
}

// function regsterUser() {
//     let name = "daniela";
//     let email = "daniela@example.com";
//     let passwort = "ertezrz";

//     let user = {
//         'name': name,
//         'email': email,
//         'passwort': passwort
//     };
//     putData("tasks", user);
// }
// async function putData(path, data) {
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     let responseToJson = await response.json();
//     return responseToJson;
// }

function toggleMenu() {
  let menu = document.querySelector(".menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
