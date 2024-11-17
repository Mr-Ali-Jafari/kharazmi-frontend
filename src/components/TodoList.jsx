import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Todo List</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTodo}
            className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg ${
                todo.completed ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(index)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-gray-700 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
