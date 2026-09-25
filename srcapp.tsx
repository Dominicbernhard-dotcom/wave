import { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = () => {
    const text = input.trim();

    if (!text) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);

    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app">
      <section className="todo-card">
        <header>
          <p className="eyebrow">PERSONAL PRODUCTIVITY</p>

          <h1>My Tasks</h1>

          <p className="subtitle">
            Organize your day and keep track of your tasks.
          </p>
        </header>

        <div className="input-row">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add task</button>
        </div>

        <nav className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </nav>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty">
              <span>✓</span>
              <p>No tasks here.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <article className="task" key={task.id}>
                <button
                  className={`checkbox ${
                    task.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className={task.completed ? "done" : ""}>
                  {task.text}
                </span>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  ×
                </button>
              </article>
            ))
          )}
        </div>

        <footer>
          <span>
            {remaining} {remaining === 1 ? "task" : "tasks"} remaining
          </span>

          <button onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
