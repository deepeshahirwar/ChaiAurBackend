import { useEffect, useState } from 'react' 
import axios  from 'axios';

import './App.css'

function App() {
  const [jokes, setJokes] = useState([])
    
  // getting all jokes
  useEffect(()=>{ 

    axios.get('/api/jokes') 
    .then((response) => {
      setJokes(response.data) 
      
    })
    .catch((error) => {
      console.error('Error fetching jokes:', error);
    }); 

  })
  return (
    <>
  <div className="min-h-screen bg-gradient-to-br
   from-yellow-100 to-pink-100 p-6">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold
       text-orange-600 mb-2">Chai and Fullstack ☕️</h1>
      <p className="text-lg text-gray-700
       mb-6" >Total Jokes: <span className="font-semibold">
        {jokes.length}</span></p>
    </div>

    <div className="max-w-3xl mx-auto grid gap-6">
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="bg-white shadow-md rounded-2xl p-6
           hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold
           text-purple-700 mb-2">{joke.title}</h3>
          <p className="text-gray-800">{joke.content}</p>
        </div>
      ))}
    </div>
  </div>
</>

  )
}

export default App
