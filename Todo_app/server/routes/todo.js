import express from 'express'; 
import {createTodo, deleteTodo, getAllTodos, updateTodo, markTodoAsCompleted} 
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

router.route('/:todoId/complete')
  .put(isAuthenticated, markTodoAsCompleted);





 
export default router;