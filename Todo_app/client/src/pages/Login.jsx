import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import GoBackButton from '@/components/ui/GoBackButton'; // Import the GoBackButton component



const Login = () => { 
 const navigate = useNavigate();


    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value  
        });
    };

    const loginHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                { email: user.email, password: user.password }, // Send email and password in the request
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) { 
                console.log(res.data.message);
               
                toast.success("User login successfully.", {
                    position: 'top-center',  // Customize the position directly here
                });
                navigate('/');

            }
        } catch (error) {
            toast.error("User Login failed.",{
                position:'top-center',
            });
            console.log("Error in loginHandler:", error);
        }
    };

    return (  
        <> 
        <GoBackButton /> {/* Add the GoBackButton component here */}
       
        <div className="min-h-screen 
        flex items-center justify-center
         bg-gradient-to-r from-blue-300 to-blue-600"> 
        
       
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
            <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Login</h1>

            <div className="space-y-6">
                <Input
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Button
                    onClick={loginHandler}
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-xl"
                >
                    Login
                </Button>
            </div>  
            {/*  if you don't have an account,  */}
            <div className="mt-4 text-center">
                <p className="text-gray-600">Don't have an account? 
                    <a href="/register" className="text-blue-600 font-semibold"> Register</a>
                </p>
            </div> 

        </div>
    </div> 
    </>
    );
};

export default Login;
