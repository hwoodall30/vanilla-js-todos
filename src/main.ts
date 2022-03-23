import "./style.css";

let todos = [
  {
    id: 1,
    title: "todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "todo 2",
    completed: false,
  },
];

const app = document.querySelector<HTMLDivElement>("#app")!;
const todoList = app.querySelector<HTMLUListElement>(".TodoList")!;
const form = app.querySelector<HTMLFormElement>("form")!;
const input = app.querySelector<HTMLInputElement>("input")!;
const addTodoBtn = app.querySelector<HTMLButtonElement>(".AddTodoBtn")!;
const deleteBtn = todoList.querySelectorAll<HTMLButtonElement>(".DeleteBtn")!;

function addTodo(): void {
  const todo = input.value;
  if (todo) {
    todos.push({
      id: todos.length + 1,
      title: todo,
      completed: false,
    });
  }
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="todo-${todos.length}" />
    <label for="${todos.length}">${todo}</label>
    <button data-id="${todos.length}" class="DeleteBtn">Delete</button>
  `;
  todoList.appendChild(li);
  input.value = "";
  console.log(todos);
}

function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  const li = todoList.querySelector<HTMLLIElement>(`#todo-${id}`)!;
  todoList.removeChild(li);
  console.log(todos);
}

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = parseInt(btn.dataset.id as string);
    deleteTodo(Number(id));
  });
});

addTodoBtn.onclick = (e) => {
  e.preventDefault();
  addTodo();
};

todos.forEach((todo) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="${todo.id}" />
    <label for="${todo.id}">${todo.title}</label>
    <button class="DeleteBtn">Delete</button>
  `;
  todoList.appendChild(li);
});
