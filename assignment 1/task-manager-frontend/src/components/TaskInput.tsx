import { useState } from "react";

export default function TaskInput({ onAdd }: { onAdd: (desc: string) => void }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onAdd(description);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
