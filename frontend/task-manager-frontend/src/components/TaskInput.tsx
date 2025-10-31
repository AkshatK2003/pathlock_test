import { useState } from "react";

export default function TaskInput({ onAdd }: { onAdd: (name: string, desc: string) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), description.trim());
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Task name"
          />
        </div>
        <div className="col-md-5">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Description of task"
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
