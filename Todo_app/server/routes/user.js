import express from 'express'; 
import {registerUser, loginUser, logoutUser} 
 from '../controllors/user.control.js'; 

 

const router = express.Router(); 
 
router.route('/register').post(registerUser); 
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
 
export default router;