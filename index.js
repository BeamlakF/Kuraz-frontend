window.onload = function () {
  let tasks = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true }
  ];

  const taskList = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput');

  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';

      if (task.completed) {
        li.classList.add('list-group-item-success');
      }

      li.innerHTML = `
        <div class="form-check">
          <input class="form-check-input me-2" type="checkbox" ${
            task.completed ? 'checked' : ''
          } onchange="toggleTask(${task.id})">
          <label class="form-check-label ${task.completed ? 'text-decoration-line-through' : ''}">
            ${task.title}
          </label>
        </div>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">&times;</button>
      `;

      taskList.appendChild(li);
    });
  }

  window.addTask = function () {
    const title = taskInput.value.trim();
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  };

  window.toggleTask = function (id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  };

  window.deleteTask = function (id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  };

  renderTasks();
};
