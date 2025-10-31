import { useEffect, useState } from "react";
import { getTasks, addTask, toggleTask, deleteTask } from "./api";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const load = async () => setTasks((await getTasks()).data);

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (desc: string) => {
    await addTask(desc);
    load();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    load();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    load();
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskInput onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
