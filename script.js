const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const error = document.querySelector('#error');

let todos = [];

const fetchTodos = async () => {
    let url = 'https://jsonplaceholder.typicode.com/todos?_start=10&_limit=10';
    const res = await fetch(url);
    const data = await res.json();
    
    todos = data;
    console.log(todos);
    
    listTodos(todos);
    
}

fetchTodos()

const listTodos = (todos) => {
    output.innerHTML = '';

    todos.forEach(todo => {
        output.innerHTML += newTodo(todo);
    })
}

const newTodo = todo => {

    let template = todo.completed ? `
        <div class="card p-3 my-3 todo bg-done">
            <div id="${todo.id}" class="d-flex justify-content-between align-items-center">
                <button class="btn btn-success done">Undo</button>
                <h3 class="title">${todo.title}</h3>
                <button class="btn btn-danger">X</button>
            </div>
        </div>
        `
        : `
        <div class="card p-3 my-3 todo">
            <div id="${todo.id}" class="d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-success done">Done</button>
                <h3 class="title">${todo.title}</h3>
                <button class="btn btn-danger disabled">X</button>
            </div>
        </div>
        `

        return template;

}

const createTodo = async title => {
    
    let url = 'https://jsonplaceholder.typicode.com/todos';

    const data = {
        title,
        completed: false
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        
    const todo = await res.json()
    
    todo.id = Math.floor((Math.random() * 1000) +1).toString()
    console.log(todo)
    todos.unshift(todo);
        
    listTodos(todos);

}

form.addEventListener('submit', e => {
    e.preventDefault();

    if(input.value === '') {
        error.innerText = 'Enter a ToDo';
    } else {
        error.innerText = '';
        createTodo(input.value);
        input.value = '';
    }
})

output.addEventListener('click', e => {
    if(e.target.classList.contains('done')) {
        toggleComplete(e.target.parentNode.id)
    }

    if(e.target.classList.contains('btn-danger')) {
        deleteTodo(e.target.parentNode.id)
    }
})

const toggleComplete = id => {
    todos.map(todo => {
        if(todo.id == id) {
            todo.completed = !todo.completed;
        }
        return todo;
    })
    listTodos(todos);
}

const deleteTodo = id => {
    todos = todos.filter(todo => todo.id != id)
    listTodos(todos);
}
