import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import GoBackButton from '@/components/ui/GoBackButton'; // Import the GoBackButton component

const Register = () => { 
 const navigate = useNavigate();


    const [user, setUser] = useState({ 
        username:"",
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value  
        });
    };

    const registerHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/register",
                { username: user.username , email: user.email, password: user.password }, // Send email and password in the request
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) { 
                console.log(res.data.message);
                toast.success("User Registered successfully.", {
                    position: 'top-center',  // Customize the position directly here
                });
                navigate('/');

            }
        } catch (error) {
            toast.error("User Register failed.",{
                position:'top-center',
            });
            console.log("Error in registerHandler:", error);
        }
    };

    return (  
        <>
          <GoBackButton /> {/* Add the GoBackButton component here */}
        <div className="min-h-screen 
        flex items-center justify-center
         bg-gradient-to-r from-blue-300 to-blue-600">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
            <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Register</h1>

            <div className="space-y-6"> 
            <Input
                    name="username"
                    value={user.username}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> 

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
                    onClick={registerHandler}
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-xl"
                >
                   Register
                </Button> 


            </div> 
            {/* if you have already account */}
            <p className="text-center mt-4">
                Already have an account? <a href="/login" className="text-blue-600">Login here</a>
            </p>
        </div>
    </div> 
    </>
    );
};

export default Register;
