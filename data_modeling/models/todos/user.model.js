import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({ 
     username:{
        type: String,
        required: true,
        unique: true,
         lowercase: true,
     } , 
     email:{
        type: String, 
        required: true,
        unique:true, 
        lowercase:true
     },
    password:{
        type: String, 
        // custom messages
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'],
    }


 }, {timestamps: true }  // createdAt and updatedAt fields
); 

export const User = mongoose.model("User", userSchema);

  