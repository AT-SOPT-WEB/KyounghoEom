

const addBtn = document.querySelector(`.addBtn`);
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('todoList')) || [];

todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo;
    console.log('Todo:', todo);
    todoList.appendChild(li);
});

addBtn.addEventListener('click', () => {
    console.log('Button clicked');

    const li = document.createElement('li');
    li.textContent = input.value;

    todoList.appendChild(li);
    console.log('Added:', li.textContent);
    
    todos.push(input.value);
    localStorage.setItem('todoList', JSON.stringify(todos));
});


