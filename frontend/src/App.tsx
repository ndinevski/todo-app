import React, { useEffect, useState } from "react";
import { ListChecks } from "lucide-react";
import { Todo } from "./types/todo";
import { todoService } from "./services/todoService";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      const sortedData = sortTodosByDueDate(data);
      setTodos(sortedData);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortTodosByDueDate = (todos: Todo[]): Todo[] => {
    return [...todos].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  const handleAddTodo = async (newTodo: Omit<Todo, "id" | "createdAt">) => {
    try {
      const todo = await todoService.addTodo(newTodo);
      setTodos((prev) => sortTodosByDueDate([...prev, todo]));
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updated = { ...todo, completed: !todo.completed };
      await todoService.updateTodo(updated);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      if (editingTodo?.id === id) {
        setEditingTodo(null);
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditTodo = async (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (
    updatedTodo: Omit<Todo, "id" | "createdAt">
  ) => {
    if (!editingTodo) return;

    try {
      const todo = { ...editingTodo, ...updatedTodo };
      await todoService.updateTodo(todo);
      setTodos((prev) =>
        sortTodosByDueDate(prev.map((t) => (t.id === todo.id ? todo : t)))
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ListChecks size={32} className="text-orange-500 mr-2" />
          <h1 className="text-3xl font-bold text-orange-500">Todo App</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <TodoForm
              onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
              initialData={editingTodo}
              onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
            />
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No tasks yet. Add one on the left!
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                  isEditing={editingTodo?.id === todo.id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
