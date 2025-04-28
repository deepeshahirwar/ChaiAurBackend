 
 
import Todo from '../models/todo.model.js' 
 
// for creationg new todos
export const createTodo  = async (req, res)=>{
    try{
      const {title, description} = req.body;  
       // Check if all fields are filled
      if(!title || !description){
          return res.status(400).json({
              success: false,
              message: "Please fill all the fields."
          }); 
      }
    
    // create new todo
      Todo.create({
        title,
        description
    });

    return res.status(201).json({
       success: true,
       message:"Todo Created Successfully."
    });
  
    }catch(error){
        console.error("Error in createTodo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}; 

// for getting all todos 
 
export const getAllTodos = async (req, res)=>{ 
    
      try{ 
        const todos = await Todo.find(); 
        console.log(todos); 

        return res.status(200).json({
            success : true, 
            todos
        })

      }catch(error){
         console.log("Error in getAllTodos : " , error);
         return res.status(500).json({
            success: false,
            message : "Internal server error."
         })
         
      }
}; 

// for upating todos 

export const updateTodo = async (req, res)=>{
   
  try{ 
    const todoId = req.params.todoId; 
    const {title, description} = req.body; 
     
    const todo = await Todo.findByIdAndUpdate(todoId, {title,description}, {new:true}); 

    return res.status(200).json({
       success : true,
       todo, 
       description,
       message: 'todo updated successfully.'
    })

  }catch(error){
    console.log("Error in update todo : ",error);
    return res.status(500).json({
      success: false,
      message : "Internal server error."
   })
  }
};

// for deleting todos 

export const deleteTodo = async (req, res)=> {
    try { 

      const todoId = req.params.todoId;
       
      const todo = await Todo.findByIdAndDelete(todoId, {new:true});  
      return res.status(200).json({
        success : true,
        todo,
        message: 'todo deleted successfully.'
     })

    } catch (error) { 

      console.log("Error in delete todo : ",error);
      return res.status(500).json({
        success: false,
        message : "Internal server error."
     })
        
    }
};