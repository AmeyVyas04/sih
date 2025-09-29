import Doctor from "@/models/doctor";
import Connect from "@/mongodb/dbconnect";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    await Connect()

    try {
        const { email, password } = await req.json();

        console.log("Login attempt for email:", email);
        console.log("Password received:", password ? "***" : "undefined");

        // Validate input
        if (!email || !password) {
            console.log("Missing email or password");
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const doctor = await Doctor.findOne({ "personalInfo.email": email });
        console.log("Doctor found:", doctor ? "Yes" : "No");
        
        if (!doctor) {
            console.log("No doctor found with email:", email);
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        console.log("Doctor account status:", doctor.accountStatus);
        
        // Check if doctor account is active
        if (doctor.accountStatus !== 'Active') {
            console.log("Account not active:", doctor.accountStatus);
            return NextResponse.json({ 
                message: "Account is not active. Please contact administration." 
            }, { status: 401 });
        }

        // Password is stored in auth.password
        console.log("Auth object exists:", !!doctor.auth);
        console.log("Password field exists:", !!(doctor.auth && doctor.auth.password));
        
        const doctorPassword = doctor.auth?.password;
        
        if (!doctorPassword) {
            console.log("No password found in doctor record");
            return NextResponse.json({ message: "Password not found in doctor record" }, { status: 500 });
        }

        console.log("About to compare passwords...");
        const isMatch = await bcrypt.compare(password, doctorPassword);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.log("Password does not match");
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Update last login
        doctor.lastLogin = new Date();
        await doctor.save();

        const token = jwt.sign({ 
            id: doctor._id,
            email: doctor.personalInfo.email,
            type: 'doctor'
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Create response
        const response = NextResponse.json({ 
            message: "Login successful",
            doctor: {
                id: doctor._id,
                firstName: doctor.personalInfo.firstName,
                lastName: doctor.personalInfo.lastName,
                email: doctor.personalInfo.email,
                specialization: doctor.professionalInfo.specialization,
                accountStatus: doctor.accountStatus
            }
        });

        // Set cookie with proper options
        response.cookies.set("doctortoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 day
            path: "/",
        });

        console.log("Login successful for doctor:", doctor.personalInfo.email);
        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            message: "Internal server error" 
        }, { status: 500 });
    }
}