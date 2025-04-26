import mongoose from 'mongoose'; 

const  doctorSchema = new mongoose.Schema({ 

    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    qualification:{
        type:String,
        required:true
    }, 
    specialization:{
        type:String,
        required:true   
    },
    experience:{
        type:Number,
        defalut:0
    } ,
    workInHospitals:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
]


},{timestamps:true}); 

export const Doctor = mongoose.model('Doctor',doctorSchema);