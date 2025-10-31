interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  // Show newest tasks first
  const sortedTasks = [...tasks].reverse();

  return (
    <ul className="task-list">
      {sortedTasks.map((t) => (
        <li key={t.id} className={t.isCompleted ? "completed" : ""}>
          <span onClick={() => onToggle(t.id)}>{t.description}</span>
          <button onClick={() => onDelete(t.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
