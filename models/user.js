import mongoose from "mongoose";

const PatientSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true
        },
        address:{
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            }
        },
        gender:{
            type:String,
            required:true
        },
        verifyotp: 
        {
         type: String,
         default:'',
         },
        verifyotpexpireat: {
         type: Number,
         default:0,
       },
       isaccountverified: {
         type: Boolean,
         default:false,
        },
        resetotp: {
         type: String,
         default:'',
        },
        resetotpexpireat: {
         type: Number,
         default:0,
        },
        password:{
            type:String,
            required:true
        }

    }
    
)
const Patient=mongoose.models.Patient || mongoose.model("Patient",PatientSchema);
export default Patient;
