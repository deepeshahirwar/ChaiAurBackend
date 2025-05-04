import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';


const Navbar = () => {  
  
  const navigate = useNavigate();

 

  const logoutHandler = async () => {
    try { 
      const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) { 
        const ok = confirm("Are you sure you want to logout?");
        if (ok) {
          
          toast.success("User logout successfully."); 
          navigate('/login'); 
        } 
      }
    } catch (error) {
      console.log("Error in logoutHandler: ", error);
      toast.error("User not logout.");
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-blue-700 text-white shadow-md">
      <h1 className="text-2xl font-bold">
        Daily-Tasks
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <a href="/login" className="text-white font-semibold hover:underline">Login</a>
          <span>/</span>
          <a href="/register" className="text-white font-semibold hover:underline">Register</a>
        </div>

        <Button
          onClick={logoutHandler}
          className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-100"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
