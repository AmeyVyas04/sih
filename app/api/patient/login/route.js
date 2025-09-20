import Patient from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Connect from "@/mongodb/dbconnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await Connect();
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required" }, 
        { status: 400 }
      );
    }
    
    const verifypatient = await Patient.findOne({ email });
    if (!verifypatient) {
      return NextResponse.json(
        { error: "Invalid Credentials" }, 
        { status: 400 }
      );
    }
    
    const passwordmatch = await bcrypt.compare(password, verifypatient.password);
    if (!passwordmatch) {
      return NextResponse.json(
        { error: "Invalid Credentials" }, 
        { status: 400 }
      );
    }
    
    const token = jwt.sign(
      { Patientid: verifypatient._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );
    
    // Create response
    const response = NextResponse.json(
      { 
        message: "Login Successful",
        patient: {
          id: verifypatient._id,
          name: verifypatient.name,
          email: verifypatient.email
        }
      }, 
      { status: 200 }
    );
    
    // Set cookie on the response
    response.cookies.set("patienttoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day in seconds
      path: "/",
    });
    
    return response;
    
  } catch (error) {
    console.log("Error in patient login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
};