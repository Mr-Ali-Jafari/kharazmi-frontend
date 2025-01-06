import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const API_URL = 'http://127.0.0.1:8000'; 


  const getAccessToken = () => {
    return localStorage.getItem('access_token') || '';
  };


  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/todos'); 
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axiosInstance.post('/todos/', {
          title: newTodo,
          description: '',
          status: false,
        });
        setTodos([...todos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axiosInstance.put('/todos/update', {
        id,
        ...updatedFields,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...response.data } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error.response?.data || error);
    }
  };
  

  const toggleTodoCompletion = (id, completed) => {
    updateTodo(id, { status: completed });
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg ${
                todo.status ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleTodoCompletion(todo.id, !todo.status)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-gray-700 ${todo.status ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
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
