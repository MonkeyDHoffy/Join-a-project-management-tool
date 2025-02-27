let title;
let description;
let dueDate;
let category;
let items;
let selectedSubtasks = [];

async function createTaskInit() {
  getAssignedContacts();
  renderAssignedContacts();
  await getTasks();
}

function getTaskInputs() {
title = document.querySelector(".addTask-title input").value;
description = document.querySelector(".addTask-description textarea").value;
dueDate = document.querySelector(".task-date input").value;
category = document.getElementById("category-field").value;
items = Array.from(document.getElementsByClassName("subtask-item"));
}

async function createTask() {
  getTaskInputs();
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    "id": createdTasks.length + 1, "status": "toDo", "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  showTaskNotification();
}

async function createTaskOverlay() {
  getTaskInputs();
  items.forEach((item) => {
    selectedSubtasks.push(item.innerHTML);
  });
  let newTask = {
    "id": createdTasks.length + 1, "status": "toDo", "title": title,
    "description": description,
    "selectedContacts": selectedContacts.length > 0 ? selectedContacts.map((contact) => contact.name) : [""],
    "dueDate": dueDate, "priority": priority, "selectedCategory": category,
    "subtasks": selectedSubtasks.length > 0 ? selectedSubtasks : [""],
    "completedSubtasks": [""],
  };
  createdTasks.push(newTask);
  selectedSubtasks = [];
  selectedContacts = [];
  await putTasks();
  showTaskNotificationOverlayAddTask();
}
