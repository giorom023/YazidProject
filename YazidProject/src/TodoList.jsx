import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(data => setTodos(data.slice(0, 5)));
  }, []);

  const toggleTask = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  };

  const addTask = () => {
    if (newTask === "") return;
    setTodos([...todos, { id: todos.length + 1, title: newTask, completed: false }]);
    setNewTask("");
  };

  return (
    <>
      <h2>Todo List</h2>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTask(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
        </div>
      ))}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
    </>
  );
};

export default TodoList;