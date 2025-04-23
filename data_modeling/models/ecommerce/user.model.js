import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({ 
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    } ,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    } , 

    password:{
        type:String,
        required:true,
        minLength: [6, 'Password must be at least 6 characters long'],
    } ,



}, {timeseries: true})

export const User = mongoose.model("User", userSchema);