
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Button } from '@/components/ui/button';

import GoBackButton from '@/components/ui/GoBackButton';


const InCompletedTodos = () => {
    const [InCompletedTodos, setInCompletedTodos] = useState([]);

    const fetchInCompletedTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/todo', {
          withCredentials: true,
        });
        const allTodos = res.data.todos;
        const completed = allTodos.filter(todo => todo.completed === false );
        setInCompletedTodos(completed);
      } catch (error) {
        console.log('Error fetching incomplete todos:', error);
      }
    };
  
    useEffect(() => {
      fetchInCompletedTodos();
    }, []);
  
    return ( 
  
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-8">  
      
        
       <GoBackButton /> {/* Add the GoBackButton component here */}
  
        <h1 className="text-4xl font-bold text-white text-center">InCompleted Todos</h1>
        <p className="text-lg text-white text-center mt-2">Here you can find all your incomplete tasks.</p>
  
        <div className="mt-8 max-w-2xl mx-auto space-y-4">
          {InCompletedTodos.length === 0 ? (
            <p className="text-white text-center">No incomplete todos yet.</p>
          ) : (
            InCompletedTodos.map(todo => (
              <div
                    key={todo._id }
                    className="bg-white p-6 rounded-lg shadow-lg mb-4 border-l-4 border-r-4 border-blue-500 hover:bg-slate-200"
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">{todo.title || "No Title"}</h2>
                    <p className="text-gray-600 font-sans mt-2">{todo.description || "No Description"}</p>

                  </div>
            ))
          )}
        </div>
      </div>
    );
  };

export default InCompletedTodos