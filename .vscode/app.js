const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  todoList.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.onclick = () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    };

    const btn = document.createElement('button');
    btn.textContent = '×';
    btn.className = 'delete-btn';
    btn.onclick = () => {
      todos.splice(i, 1);
      save();
      render();
    };

    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  save();
  render();
};

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.onclick();
});

render();