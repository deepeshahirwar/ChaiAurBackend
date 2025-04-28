import mongoose from 'mongoose'; 
import { connect } from 'mongoose';

const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/todo_app'; // Replace with your MongoDB connection string

const connectDB = async () => {
    try {
        await connect(dbUrl);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}; 

export default connectDB;