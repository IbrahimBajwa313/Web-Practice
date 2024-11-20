const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('tasks');
const emptyTasksContainer = document.getElementById('empty-tasks');
const errorMessageContainer = document.getElementById('error-message');

let tasks = [];

// Function to update button color based on input values
function updateButtonState() {
  const titleValue = taskTitle.value.trim();
  const descriptionValue = taskDescription.value.trim();
  
  if (titleValue !== '' && descriptionValue !== '') {
    addTaskButton.classList.add('active'); // Add active class
  } else {
    addTaskButton.classList.remove('active'); // Remove active class
  }
}

function displayTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyTasksContainer.style.display = 'flex';
  } else {
    emptyTasksContainer.style.display = 'none';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const taskInfo = document.createElement('div');
      taskInfo.classList.add('task-info');

      const taskNumber = index + 1; // Task numbers start from 1
      const h3 = document.createElement('h3');
      h3.textContent = `Task ${taskNumber}: ${task.title}`; // Display task number

      const p = document.createElement('p');
      p.textContent = task.description;

      taskInfo.appendChild(h3);
      taskInfo.appendChild(p);
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));
      li.appendChild(taskInfo);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
}

function addTask() {
  const titleValue = taskTitle.value.trim();
  const descriptionValue = taskDescription.value.trim();

  if (titleValue === '' || descriptionValue === '') {
    errorMessageContainer.textContent = 'Both task title and description are required.';
    return;
  }

  errorMessageContainer.textContent = '';

  const task = {
    title: titleValue,
    description: descriptionValue
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
  taskTitle.value = '';
  taskDescription.value = '';
  updateButtonState();
}

function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task at the specified index
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
  displayTasks(); // Re-display tasks
}

// Event listeners to check input changes
taskTitle.addEventListener('input', updateButtonState);
taskDescription.addEventListener('input', updateButtonState);

addTaskButton.addEventListener('click', addTask);

// Load stored tasks from local storage, if available
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  displayTasks();
}