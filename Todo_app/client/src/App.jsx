

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CompletedTodos from './pages/CompletedTodos'; 
import Layout from './components/ui/layout'; // Adjust the import path as necessary 
import InCompletedTodos from './pages/InCompletedTodos';  
import { Button } from './components/ui/button';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Navbar will be rendered here
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/completed',
        element: <CompletedTodos />,
      }, 
      {
        path: '/incompleted',
        element: <InCompletedTodos />,
      }
    ],
  },
  // No Navbar for these routes
  {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/register',
    element: <Register />, 
  },
]);

function App() {
  return <RouterProvider router = {appRouter} />;

}

export default App
