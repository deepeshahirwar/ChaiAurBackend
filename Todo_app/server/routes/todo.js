import express from 'express'; 
import {createTodo, deleteTodo, getAllTodos, updateTodo} 
 from '../controllors/todo.control.js';   
  

 import {isAuthenticated } from '../middleware/isAuthenticated.js'

 

const router = express.Router(); 
// Only Authenticate user can do CRUD operation on todos 
router.route('/')
.post(isAuthenticated  ,createTodo)
.get(getAllTodos); 
router.route('/:todoId')
.put(isAuthenticated  ,updateTodo)
.delete(isAuthenticated  ,deleteTodo); 




 
export default router;