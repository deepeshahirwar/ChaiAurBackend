import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import Navbar from '@/pages/Navbar';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import axios from 'axios';
import { toast } from 'sonner'; 
import { useNavigate} from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null); // Track the todo being edited 


  const navigate = useNavigate();

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

  // Add or update todo
  const handleTodoSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description cannot be empty.", {
        position: "top-center"
      });
      return;
    }

    if (editingTodoId) {
      // Update existing todo
      try {
        const res = await axios.put(
          `http://localhost:3000/api/v1/todo/${editingTodoId}`,
          { title, description },
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log('Todo updated:', res.data);
          toast.success("Todo updated successfully.", {
            position: "top-center",
          });
          fetchTodo();
          setEditingTodoId(null); // Reset editing state
          setTitle('');
          setDescription('');
        } else {
          toast.error("Failed to update Todo.", { position: "top-center" });
        }
      } catch (error) {
        console.log("Error in handleTodoSubmit (update):", error);
        toast.error("Todo not updated.", { position: "top-center" });
      }
    } else {
      // Add new todo
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
          fetchTodo();
          setTitle('');
          setDescription('');
        } else {
          toast.error("Failed to create Todo.", { position: "top-center" });
        }
      } catch (error) {
        console.log("Error in handleTodoSubmit (add):", error);
        toast.error("Todo not created.", { position: "top-center" });
      }
    }
  };

  // Delete todo
  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/todo/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log('Todo deleted:', res.data);
        toast.success("Todo deleted successfully.", { position: "top-center" });
        fetchTodo();
      } else {
        toast.error("Failed to delete Todo.", { position: "top-center" });
      }
    } catch (error) {
      console.log("Error in deleteTodoHandler:", error);
      toast.error("Todo not deleted.", { position: "top-center" });
    }
  };

  // Edit todo
  const editTodoHandler = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodoId(todo._id); // Set the id of the todo being edited
  }; 

  // mark as completed 
 const todoCompleteHandler = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/todo/${id}/complete`, {}, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Todo marked as completed");
  
        // update the state locally if you use useState
        setTodos(prev =>
          prev.map(todo => todo._id === id ? { ...todo, completed: true } : todo)
        );
      }
    } catch (error) {
      console.error("Error completing todo:", error);
      toast.error("Failed to mark as completed");
    }
  };
  

  return (
    <>
     

      {/* Title input and Add/Update button */}
      <div className="flex items-center justify-center space-x-4 p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo title..."
          className="w-80 px-4 py-2 rounded border text-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          onClick={handleTodoSubmit}
          className={`${
            editingTodoId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold px-4 py-2 rounded`}
        >
          {editingTodoId ? 'Update Todo' : 'Add Todo'}
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
 

      {/* Filter buttons */} 
      <div className='flex items-center justify-center space-x-4 py-8 '> 
      <Button  
       onClick={() => navigate('/completed')}
       className="bg-blue-700 text-white hover:bg-blue-600">Completed Todos</Button> 
       
       <Button 
        onClick={() => navigate('/incompleted')}
        className="bg-green-500 text-white hover:bg-green-400">InCompleted Todos</Button> 

      </div>

      {/* All Todos Display */}
      <div className="mt-8 flex justify-center">
        <div className="w-1/2 space-y-4">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              todo && (
                <div
                  key={todo._id || index}
                  className="bg-white p-6 rounded-lg shadow-lg mb-4 border-l-4 border-r-4 border-blue-500 hover:bg-slate-200"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{todo.title || "No Title"}</h2>
                  <p className="text-gray-600 font-sans mt-2">{todo.description || "No Description"}</p>

                  {/* Delete and edit todo */}
                  <Button
                    onClick={() => deleteTodoHandler(todo._id)}
                    className="bg-red-600 text-white mt-4 font-semibold px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </Button>

                  <Button
                    onClick={() => editTodoHandler(todo)}
                    className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded ml-4 hover:bg-yellow-700"
                  >
                    Edit
                  </Button> 

                  <Button
                    onClick={() => todoCompleteHandler(todo._id)}
                   className={`${
                   todo.completed ? 'bg-blue-700 ' : 'bg-green-600 hover:bg-green-700'
                  } text-white font-semibold px-4 py-2 rounded ml-4`}
                  disabled={todo.completed}
                        >
                     {todo.completed ? 'Completed' : 'Mark as Completed'}
                    </Button>
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
