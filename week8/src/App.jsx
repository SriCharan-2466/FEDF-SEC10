import React, { useState, useEffect } from "react";
import tasksData from "./task.json";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load data from localStorage or fallback to JSON file
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(tasksData);
      localStorage.setItem("tasks", JSON.stringify(tasksData));
    }
  }, []);

  // Whenever tasks change, save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // Toggle completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update task title (inline edit)
  const updateTaskTitle = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear all tasks (optional feature)
  const clearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Conditional Rendering */}
      {tasks.length === 0 ? (
        <p>No tasks available. Add one!</p>
      ) : (
        <>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    updateTaskTitle(task.id, e.target.value)
                  }
                />
                <button onClick={() => deleteTask(task.id)}>🗑️</button>
              </li>
            ))}
          </ul>

          <button className="clear" onClick={clearAll}>
            Clear All
          </button>
        </>
      )}
    </div>
  );
}

export default App;
