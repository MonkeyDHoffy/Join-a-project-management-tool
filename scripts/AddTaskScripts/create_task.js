// let selectedSubtasks = [];
// let createdTasks = [];

// async function init() {
//   addTaskInit();
//   getAssignedContacts();
//   renderAssignedContacts();
//   await getTasks();
// }

// function createTask() {
//   let title = document.querySelector(".addTask-title input").value;
//   let description = document.querySelector(
//     ".addTask-description textarea"
//   ).value;
//   let dueDate = document.querySelector(".task-date input").value;
//   let category = document.getElementById("category-field").value;
//   let items = Array.from(document.getElementsByClassName("subtask-item"));
//   items.forEach((item) => {
//     selectedSubtasks.push(item.innerHTML);
//   });
//   let newTask = {
//     id: createdTasks.length + 1,
//     status: "toDo",
//     title: title,
//     description: description,
//     selectedContacts:
//       selectedContacts.length > 0
//         ? selectedContacts.map((contact) => contact.name)
//         : [""],
//     dueDate: dueDate,
//     priority: priority,
//     selectedCategory: category,
//     subtasks: selectedSubtasks.length > 0 ? selectedSubtasks : [""],
//     completedSubtasks: [""],
//   };
//   createdTasks.push(newTask);
//   selectedSubtasks = [];
//   selectedContacts = [];
//   fetchtasks();
//   showTaskNotification();
//   console.log("Task created:", newTask);
//   console.log("All tasks:", createdTasks);
//   showTaskNotification();
// }

// async function fetchtasks() {
//   putData("tasks", createdTasks);
// }

let selectedSubtasks = [];

async function createTaskInit() {
  getAssignedContacts();
  renderAssignedContacts();
  await getTasks();
  createdTasks.forEach((task) => {
    if (task.selectedContacts[0] === "") {
      task.selectedContact = [];
    }
    if (task.completedSubtasks[0] === "") {
      task.completedSubtasks = [];
    }
    if (task.subtasks[0] === "") {
      task.subtasks = [];
    }
  });
}

async function createTask() {
  let title = document.querySelector(".addTask-title input").value;
  let description = document.querySelector(
    ".addTask-description textarea"
  ).value;
  let dueDate = document.querySelector(".task-date input").value;
  let category = document.getElementById("category-field").value;
  let items = Array.from(document.getElementsByClassName("subtask-item"));
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    id: createdTasks.length + 1,
    status: "toDo",
    title: title,
    description: description,
    selectedContacts:
      selectedContacts.length > 0
        ? selectedContacts.map((contact) => contact.name)
        : [""],
    dueDate: dueDate,
    priority: priority,
    selectedCategory: category,
    subtasks: selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    completedSubtasks: [""],
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  await uploadTasksToFirebase();
  showTaskNotification();
  console.log("Task created:", newTask);
  console.log("All tasks:", createdTasks);
}

async function uploadTasksToFirebase() {
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
  await putData("tasks", createdTasks);
  // await boardInit();
}


async function setItem(key, value) {
  try {
    await fetch(`${BASE_URL}${key}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  } catch (error) {
    console.error("Error setting item in Firebase:", error);
  }
}
