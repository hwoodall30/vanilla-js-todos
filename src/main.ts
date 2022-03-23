import "./style.css";

let todos: any[] = [];

const app = document.querySelector<HTMLDivElement>("#app")!;
const todoList = app.querySelector<HTMLUListElement>(".TodoList")!;
const input = app.querySelector<HTMLInputElement>("input")!;
const addTodoBtn = app.querySelector<HTMLButtonElement>(".AddTodoBtn")!;
const completedTodos = app.querySelector("span")!;

function addTodo(): void {
  const todo = input.value;
  if (todo) {
    todos.push({
      id: todos.length + 1,
      title: todo,
      completed: false,
    });

    //create li element
    const li = document.createElement("li");
    li.dataset.id = todos.length.toString();

    //create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    //create label element
    const label = document.createElement("label");
    label.innerText = todo;

    //create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("DeleteBtn");
    deleteBtn.innerText = "Delete";

    //append elements to li
    li.append(checkbox, label, deleteBtn);

    //append li to ul
    todoList.appendChild(li);
    li.animate(
      [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: 400,
        fill: "forwards",
      }
    );

    //reset input value
    input.value = "";

    //add event listener to delete button
    deleteBtn.onclick = (e) => {
      e.preventDefault();
      //@ts-ignore
      const li = e.target.parentElement;
      li.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(0)", opacity: 0 },
        ],
        {
          duration: 400,
          fill: "forwards",
          easing: "ease-in-out",
        }
      ).onfinish = () => {
        //remove todo from todos array
        todos = todos.filter((todo) => todo.id !== parseInt(li.dataset.id));
        todoList.removeChild(li);
        setCompletedTodos();
      };
    };

    //add event listener to checkbox
    checkbox.onclick = (e) => {
      //@ts-ignore
      const li = e.target.parentElement;
      //@ts-ignore
      li.classList.toggle("completed");
      // li.style.border = e.target.checked ? "1px solid #26bd6081" : "";
      //toggle completed property
      todos = todos.map((todo) =>
        todo.id === parseInt(li.dataset.id) ? { ...todo, completed: !todo.completed } : todo
      );
      setCompletedTodos();
    };
  }
}

//Todo Button event listener
addTodoBtn.onclick = (e) => {
  e.preventDefault();
  addTodo();
  setCompletedTodos();
};

//set completed todos
function setCompletedTodos(): void {
  completedTodos.innerText =
    todos.filter((todo) => todo.completed).length.toString() !== "0"
      ? "Completed:" + todos.filter((todo) => todo.completed).length.toString()
      : "";
}
