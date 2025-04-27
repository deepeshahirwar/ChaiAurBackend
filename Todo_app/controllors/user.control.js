import User from "../models/user.model.js";
import bcrypt from "bcrypt";
 

// This is for Register a new user
export const registerUser = async (req, res) => { 
    try { 
        const { username, password, email } = req.body;  

        // Check if all fields are filled
        if (!username || !password || !email) {
            return res.status(403).json({ 
                success: false,
                message: "Please fill all the fields." 
            });
        } 

        // Check if the user already exists 
        const userExists = await User.findOne({ username });  

        if (userExists) {
            return res.status(403).json({ 
                success: false,
                message: "This User already exists." 
            });
        }  

        // Hash the password 
        const hashPassword = await bcrypt.hash(password, 10);  

        // Create a new user 
        await User.create({
            username,
            email,
            password: hashPassword
        });
         
        return res.status(201).json({ 
            success: true,
            message: "Account Created successfully." 
        });

    } catch (error) {
        console.error("Error in registeruser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}; 

  
// This is for Login a user
export const loginUser = async (req, res) => {
    try{ 
        const { email, password } = req.body;

        // Check if all fields are filled
        if (!email || !password) {
            return res.status(403).json({ 
                success: false,
                message: "Please fill all the fields." 
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ 
                success: false,
                message: "This User does not exist." 
            });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ 
                success: false,
                message: "Invalid password." 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: `Welcome back ${user.username}.`
        });

    }catch(error){
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
