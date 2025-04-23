import mongoose from "mongoose"; 

const todoSchema = new mongoose.Schema({ 
    title:{
        type:String,
        required:true,
       },
       completed:{
           type : Boolean, 
              default: false,

       },
       createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
           
       },
       subTodos:[
              {
                type:mongoose.Schema.Types.ObjectId,
                ref: "SubTodo",
                
              }
       ]// Array of subTodos 

},{timestamps: true }  // createdAt and updatedAt fields 
)
   
export const Todo = mongoose.model("Todo", todoSchema);