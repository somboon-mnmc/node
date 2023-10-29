

let nextId = 5;

const todoDatabase = {
  1: { id: 1, title: "Buy a book" },
  2: { id: 2, title: "Go to school" },
  3: { id: 3, title: "Dinner with the friends" },
};

export const listTodos = () => {
  // Implement logic here to list all todos
  return Object.values(todoDatabase);
};

export const findTodo = (todoId) => {
  // Implement logic here to find a single todo by id
  return todoDatabase[todoId];
};

export const createTodo = ({ title, desc }) => {
 const newTodo = {id: nextId, title, desc}
 
  todoDatabase[nextId] = newTodo;
  nextId++;


  return newTodo;

};
