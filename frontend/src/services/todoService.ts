import todos from '../data/todos.json';
import { Todo } from '../types/todo';

// This service will be replaced with actual API calls later
export const todoService = {
  async getTodos(): Promise<Todo[]> {
    return todos.todos;
  },

  async addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    return newTodo;
  },

  async updateTodo(todo: Todo): Promise<Todo> {
    return todo;
  },

  async deleteTodo(id: string): Promise<void> {
    return;
  }
};