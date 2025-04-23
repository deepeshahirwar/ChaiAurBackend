import mongoose from "mongoose";
 
const productSchema = new mongoose.Schema({ 
     destription:{ 
        type:String, 
        required: true,
     },
      name:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
      },
        price:{
                type:Number,
                required:true,
                min: 0
        }, 
        productImage:{
            type:String,
            required:true,
        },
        stock:{
            type: Number,
            default: 0,
        },
        catogory:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:"Catogory",
            required:true,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }

},
{timestamps: true}  // createdAt and updatedAt fields
) 

export const Product = mongoose.model("Product", productSchema)