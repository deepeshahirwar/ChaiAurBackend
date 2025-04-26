import mongoose from 'mongoose'; 

const  medialRecordSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    diagnosis:{
        type: String, 
        required: true
    }, 
    treatment:{
        type: String, 
        required: true
    }, 
    prescription:{
        type: String, 
        required: true
    },
    testResults:{
        type: String, 
        required: true
    },
    followUp:{
        type: String, 
        required: true
    },
    date:{
        type: Date, 
        required: true
    },
    notes:{
        type: String, 
        required: true
    },
    status:{
        type: String, 
        required: true,
        enum:['Active','Inactive']
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true}); 

export const MedicalRecord = mongoose.model('MedicalRecord',medialRecordSchema);