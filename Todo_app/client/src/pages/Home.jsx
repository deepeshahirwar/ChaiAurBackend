import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import Navbar from '@/pages/Navbar';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import axios from 'axios';
import { toast } from 'sonner';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  // Fetch all todos
  const fetchTodo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/todo', {
        withCredentials: true,
      });
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.log("Error in fetchTodo:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // Add new todo
  const addTodoHandler = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description cannot be empty.", {
        position: "top-center"
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { title, description },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log('New todo added:', res.data);
        toast.success("Todo created successfully.", {
          position: "top-center",
        });

        // Instead of manually adding, re-fetch the updated list
        fetchTodo();

        setTitle('');
        setDescription('');
      } else {
        toast.error("Failed to create Todo.", { position: "top-center" });
      }
    } catch (error) {
      console.log("Error in addTodoHandler:", error);
      toast.error("Todo not created.", { position: "top-center" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Title input and Add button */}
      <div className="flex items-center justify-center space-x-4 p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo title..."
          className="w-80 px-4 py-2 rounded border text-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          onClick={addTodoHandler}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Todo
        </Button>
      </div>

      {/* Description input */}
      <div className="flex justify-center mt-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description here..."
          className="w-108 h-40 p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* All Todos Display */}
      <div className="mt-8 flex justify-center">
        <div className="w-1/2 space-y-4">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              todo && (
                <div
                  key={todo._id || index}
                  className="bg-white p-6 rounded-lg shadow-lg mb-4 border-l-4 border-r-4 border-blue-500 hover:bg-blue-500"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{todo.title || "No Title"}</h2>
                  <p className="text-gray-600 mt-2">{todo.description || "No Description"}</p>
                </div>
              )
            ))
          ) : (
            <p className="text-center text-gray-500">No todos found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
