

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Resgister from './pages/Register';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Resgister/>
  },
])


function App() {
  return <RouterProvider router = {appRouter} />;

}

export default App
