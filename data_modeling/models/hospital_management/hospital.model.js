import mongoose from 'mongoose'; 

const  hospitalSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    }, 
    pindode:{
       type: String,
       required: true
    },
    specializedIn:{
        type: String,
        required: true
     },
    address:{
        type: String, 
       
    },
    phoneNumber:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    bedCapacity:{
        type: Number, 
        required: true
    },
    availableBeds:{
        type: Number, 
        required: true
    },
    doctors:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    ],
    patients:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    ],
    medicalRecords:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord',
        required: true
    },
    ],
    departments:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    ],
    services:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    ],
    insuranceProviders:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceProvider',
        required: true
    },
    ]  
    

},{timestamps:true}); 

export const Hospital = mongoose.model('Hospital',hospitalSchema);