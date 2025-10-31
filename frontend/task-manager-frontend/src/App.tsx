import { useEffect, useState } from "react";
import { getTasks, addTask, toggleTask, deleteTask } from "./api";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

type FilterType = "All" | "Active" | "Completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");

  // Load tasks from API or localStorage
  const load = async () => {
    try {
      const res = await getTasks();
      const serverTasks = res.data;
      setTasks(serverTasks);
      localStorage.setItem("tasks", JSON.stringify(serverTasks));
    } catch {
      const saved = localStorage.getItem("tasks");
      if (saved) setTasks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (name: string, desc: string) => {
    await addTask(name, desc);
    await load();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    await load();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    await load();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.isCompleted;
    if (filter === "Active") return !t.isCompleted;
    return true;
  });

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-center mb-4 text-primary">📝 Task Manager</h2>
      <TaskInput onAdd={handleAdd} />

      <div className="d-flex justify-content-center gap-2 mb-3">
        <button
          className={`btn btn-sm ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${filter === "Active" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${filter === "Completed" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
