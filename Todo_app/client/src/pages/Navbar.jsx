import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const Navbar = () => { 
   const navigate = useNavigate();
 
  const logoutHandler = async()=>{
     
    try { 
      const res = await axios.get("http://localhost:3000/api/v1/user/logout")
       
      if(res.data.success){ 
        console.log(res.data.message);
        toast.success("User logout successfully.") 
        navigate('/login');
      }

    } catch (error) {
      console.log("Error in logoutHandler: ",error);
      toast.error("User not logout.")
    }
  }


  return (
    <div className="flex items-center
     justify-between p-4 bg-blue-700
      text-white shadow-md"> 

      <h1 className="text-2xl font-bold">
        Deepesh Ahirwar</h1> 
       
        <Button className="bg-white
       text-blue-700 font-semibold
        px-4 py-2 rounded hover:bg-blue-100">
        Login
      </Button> 

      <Button  
      onClick={logoutHandler}
      className="bg-white
       text-blue-700 font-semibold
        px-4 py-2 rounded hover:bg-blue-100">
        Logout
      </Button> 

    </div>
  )
}

export default Navbar
