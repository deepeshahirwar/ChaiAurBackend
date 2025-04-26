import mongoose from 'mongoose'; 

const  patientSchema = new mongoose.Schema({ 
    name:{
        type: String, 
        required: true
    },
    age:{
        type: Number, 
        required: true
    }, 
    address:{
        type: String, 
        required: true
    },
    diagonesdWith:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    }, 
    bloodGroup:{
        type: String, 
        required: true
    },  
    gender:{
        type: String, 
        required: true,
        enum:['M','F', 'Other']
    },
    admitedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

},{timestamps:true}); 

export const Patient = mongoose.model('Patient',patientSchema);