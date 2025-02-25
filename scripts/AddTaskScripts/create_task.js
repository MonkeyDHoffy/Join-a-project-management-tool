let createdTasks = [];

function createTask() {
  let title = document.querySelector(".addTask-title input").value;
  let description = document.querySelector(
    ".addTask-description textarea"
  ).value;
  let dueDate = document.querySelector(".task-date input").value;
  let subtasks = Array.from(
    document.querySelectorAll(".subtask-list .subtask-item-field li")
  ).map((item) => item.textContent.trim());

  let newTask = {
    id: createdTasks.length,
    category: selectedCategory,
    title: title,
    status: "toDo",
    assignedTo: selectedContacts,
    date: dueDate,
    description: description,
    priority: priority,
    subtasks: subtasks,
  };

  createdTasks.push(newTask);

  console.log("Task created:", newTask);
  console.log("All tasks:", createdTasks);
  showTaskNotification();
}
