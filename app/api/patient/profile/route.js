// app/api/patient/profile/route.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Patient from "@/models/user";

export async function GET() {
  try {
    // Get token from server-side cookies - MUST AWAIT cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("patienttoken")?.value;
    
    console.log("Token from cookies:", token);

    if (!token) {
      return new Response(
        JSON.stringify({ error: "No token found" }), 
        { status: 401 }
      );
    }
    
    // Verify the token and get user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User ID from token:", decoded);
    
    if (!decoded.Patientid) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }), 
        { status: 401 }
      );
    }
    
    // Find the user in the database
    const user = await Patient.findById(decoded.Patientid).select("-password");
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }), 
        { status: 404 }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        message: "User found", 
        user: {
          id: user._id,
          name: user.name, // Changed from firstName/lastName to just name
          email: user.email,
          phone: user.phone,
          age: user.age,
          address: user.address,
          gender: user.gender,
          // Add other fields from your schema
        }
      }), 
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
        } 
      }
    );
    
  } catch (error) {
    console.error("Profile error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return new Response(
        JSON.stringify({ error: "Invalid token" }), 
        { status: 401 }
      );
    }
    
    if (error.name === "TokenExpiredError") {
      return new Response(
        JSON.stringify({ error: "Token expired" }), 
        { status: 401 }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      { status: 500 }
    );
  }
}