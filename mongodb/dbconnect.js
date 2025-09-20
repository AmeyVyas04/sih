import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const Connect=async()=>{
    await mongoose.connect(process.env.MONG_URL)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err));
}
export default Connect