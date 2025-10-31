import { useState } from "react";

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
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setOpenTaskId(openTaskId === id ? null : id);
  };

  // 👇 Newest tasks at the top
  const sortedTasks = [...tasks].reverse();

  return (
    <div
      className="task-list-container d-flex flex-column gap-2"
      style={{
        maxHeight: "400px", // fixed height
        overflowY: "auto",
        paddingRight: "6px",
      }}
    >
      {sortedTasks.map((t) => {
        const [name, desc] = t.description.split(" — ", 2);
        const isOpen = openTaskId === t.id;

        return (
          <div
            key={t.id}
            className={`card ${t.isCompleted ? "border-success" : "border-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleExpand(t.id)}
          >
            <div className="card-body d-flex justify-content-between align-items-center py-2">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggle(t.id);
                  }}
                />
                <span
                  className={t.isCompleted ? "text-decoration-line-through text-muted" : ""}
                >
                  {name || "Untitled Task"}
                </span>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(t.id);
                }}
              >
                ✕
              </button>
            </div>

            {isOpen && desc && (
              <div className="card-footer bg-light text-muted small">{desc}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
