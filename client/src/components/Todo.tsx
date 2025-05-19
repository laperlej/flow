"use client"
import { useState } from 'react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';

export default function Todo() {
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleCreateTodo = () => {
    if (newTodo.title.trim()) {
      createTodo.mutate(newTodo);
      setNewTodo({ title: '', description: '' });
    }
  };

  const handleUpdateTodo = (id: number) => {
    const todo = todos?.find((t: any) => t.id === id);
    if (todo) {
      updateTodo.mutate({
        id,
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Todo List</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateTodo()}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateTodo()}
          />
          <button
            onClick={handleCreateTodo}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {todos?.map((todo: any) => (
          <div
            key={todo.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="mt-1 text-gray-400">{todo.description}</p>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleUpdateTodo(todo.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  todo.completed 
                    ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white'
                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
                }`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
