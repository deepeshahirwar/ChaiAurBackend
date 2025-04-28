 
 import express from 'express';  
 import connectDB from './Database/database.js';
 import dotenv from 'dotenv';  
 import userRoutes from './routes/user.js'; 
 import todoRoutes  from './routes/todo.js'
 import bodyParser from 'body-parser'; 
 import cookieParser from 'cookie-parser'; 
 import cors from 'cors';



 dotenv.config();
 connectDB();// Connect to MongoDB

   
const app = express();
const PORT = process.env.PORT || 4000;  

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 

app.use(
    cors({
    origin:"http://localhost:5173",
    credentials:true
})
);

// creating  routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/todo', todoRoutes); 

//api 
//http://localhost:3000/api/v1/user/
//http://localhost:3000/api/v1/todo/




    app.get('/', (req, res) => {
        res.send('Hello World!  I am woking fine .');
    }
    );  
  
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
    );