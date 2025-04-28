 import jwt from 'jsonwebtoken' 

  // check user is login or not 
  export const isAuthenticated = async ( req, res, next)=>{
    try { 
        // get user token
        const token = req.cookies.token; 
        if(!token){
            return res.status(401).json({
                success: false,
                message : "User not authenticated."
            })
        } 
   // verify user token
    const decode = jwt.verify(token, process.env.SECRETE_KEY); 
    if(!decode){
        return res.status(401).json({
            success: false,
            message : "Invalid token found."
        }) 
    } 

    req.id = decode.userId; 
    next();
  

    } catch (error) {
        
    }
 }