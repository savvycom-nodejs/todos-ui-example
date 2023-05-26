const BASE_URL = "http://127.0.0.1:3000";

const getTodoItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/todos`);

    const todoItems = response.data;
    return todoItems;
  } catch (errors) {
    console.error(errors);
  }
};

const createTodoElement = (item) => {
  const todoElement = document.createElement("li");
  todoElement.id = item.id;
  todoElement.appendChild(document.createTextNode(item.title));

  todoElement.onclick = async (event) =>
    await removeTodoElement(event, todoElement);

  return todoElement;
};

const updateTodoList = (todoItems) => {
  const todoList = document.querySelector("ul");

  if (Array.isArray(todoItems) && todoItems.length > 0) {
    todoItems.forEach((todoItem) => {
      todoList.appendChild(createTodoElement(todoItem));
    });
  } else if (todoItems) {
    todoList.appendChild(createTodoElement(todoItems));
  }
};

const addTodoItem = async (todo) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todo);

    const newTodoItem = response.data;

    return newTodoItem;
  } catch (errors) {
    console.error(errors);
  }
};

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-todos__title").value;

  const todo = {
    userId: 1,
    title: title,
    completed: false,
  };

  const submitTodoItem = await addTodoItem(todo);

  updateTodoList(submitTodoItem);
});

const deleteTodoItem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
};

const removeTodoElement = async (event, element) => {
  event.target.parentElement.removeChild(element);

  const id = element.id;

  await deleteTodoItem(id);
};

const main = async () => {
  const listTodo = await getTodoItems();
  updateTodoList(listTodo);
};

main();
