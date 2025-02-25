let createdTasks = [];

function createTask() {
  showTaskNotification();
  let title = document.querySelector(".addTask-title input").value;
  let description = document.querySelector(
    ".addTask-description textarea"
  ).value;
  let dueDate = document.querySelector(".task-date input").value;
  let category = document.getElementById("category-field").value;
  let subtasks = Array.from(
    document.querySelectorAll(".subtask-list .subtask-item")
  ).map((item) => item.textContent.trim());

  let newTask = {
    id: createdTasks.length + 1,
    title: title,
    description: description,
    selectedContacts: selectedContacts.map((contact) => contact.name),
    dueDate: dueDate,
    priority: priority,
    selectedCategory: category,
    subtasks: subtasks,
  };

  createdTasks.push(newTask);
  console.log("Task created:", newTask);
  console.log("All tasks:", createdTasks);
}
