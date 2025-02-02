import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  isEditing?: boolean;
}

const priorityColors = {
  low: 'bg-blue-900 text-blue-200',
  medium: 'bg-orange-900 text-orange-200',
  high: 'bg-red-900 text-red-200'
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, isEditing }) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all ${isEditing ? 'ring-2 ring-orange-500' : ''}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${todo.completed ? 'bg-orange-500 border-orange-500' : 'border-gray-600 hover:border-orange-500'}`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>
        
        <div>
          <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-gray-400">{todo.description}</p>
          )}
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className="text-xs text-gray-400">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className={`p-2 text-gray-400 hover:text-orange-500 rounded-full hover:bg-gray-700 transition-colors
            ${isEditing ? 'text-orange-500 bg-gray-700' : ''}`}
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-700 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};