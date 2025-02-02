import React, { useState, useEffect } from "react";
import { Plus, Save, X } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, "id" | "createdAt">) => void;
  initialData?: Todo | null;
  onCancel?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setPriority(initialData.priority);
      setDueDate(initialData.due_date?.split("T")[0] || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      priority,
      completed: initialData?.completed || false,
      due_date: dueDate || undefined,
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
            rows={2}
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo["priority"])}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-100"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-100"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            {initialData ? (
              <>
                <Save size={20} />
                <span>Update Task</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Add Task</span>
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
