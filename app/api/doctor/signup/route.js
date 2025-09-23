// app/api/auth/doctor/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "@/models/doctor";
import Connect from "@/mongodb/dbconnect";
import transporter from "@/nodemailer/nodemailer";
import { cookies } from "next/headers";
// ✅ Signup API
export async function POST(request) {
  try {
    await Connect();
    const body = await request.json();

    // --- 1. Check confirmPassword ---
    if (!body.auth?.password || body.auth.password !== body.auth.confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // --- 2. Hash password ---
    const hashedPassword = await bcrypt.hash(body.auth.password, 10);

    // --- 3. Clean + cast data ---
    const doctorData = {
      ...body,
      personalInfo: {
        ...body.personalInfo,
        dateOfBirth: body.personalInfo.dateOfBirth
          ? new Date(body.personalInfo.dateOfBirth)
          : null,
      },
      professionalInfo: {
        ...body.professionalInfo,
        yearsOfExperience: Number(body.professionalInfo.yearsOfExperience || 0),
      },
      clinicInfo: {
        ...body.clinicInfo,
        geoLocation: {
          latitude: Number(body.clinicInfo.geoLocation?.latitude || 0),
          longitude: Number(body.clinicInfo.geoLocation?.longitude || 0),
        },
      },
      availability: {
        ...body.availability,
        sessionDuration: Number(body.availability?.sessionDuration || 60),
      },
      services: (body.services || []).map((s) => ({
        ...s,
        duration: Number(s.duration || 0),
        price: Number(s.price || 0),
      })),
      auth: {
        password: hashedPassword,
        emailVerified: false,
      },
    };

    delete doctorData.auth.confirmPassword; // not needed in DB

    // --- 4. Save to DB ---
    const doctor = new Doctor(doctorData);
    await doctor.save();

    // sending welcome mail
    // Send welcome email to doctor
    const optionmail = {
      from: process.env.SENDER_EMAIL,
      to: doctor.personalInfo.email,
      subject: "Welcome to Panchakarma",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2a9d8f; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Panchakarma!</h1>
            </div>
            <div class="content">
              <h2>Hello Dr. ${doctor.personalInfo.firstName} ${doctor.personalInfo.lastName},</h2>
              <p>We're thrilled to have you on board as a practitioner with Panchakarma.</p>
              <p>Your account is currently under review and will be activated shortly. Our team will verify your credentials and contact you within 24-48 hours.</p>
              <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>Best regards,<br>The Panchakarma Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(optionmail);
      console.log("Welcome email sent successfully to doctor");
    } catch (emailError) {
      console.log("Error in sending email to doctor", emailError);
    }


    // --- 5. JWT token (optional, for login session) ---
    const token = jwt.sign(
      { id: doctor._id, email: doctor.personalInfo.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // seting cookies
    const cookiestore=await cookies()

    cookiestore.set({
        name:"doctortoken",
        value:token,
        expires:new Date(Date.now()+7*24*60*60*1000),
    })


    return NextResponse.json(
      {
        message: "Doctor registered successfully",
        doctorId: doctor._id,
        token,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}

