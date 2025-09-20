// app/api/auth/doctor/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Doctor from "@/model/doctor";
import Connect from "@/mongodb/dbconnect";
import transporter from "@/nodemailer/nodemailer";

export async function POST(request) {
  try {
    await Connect();
    const body = await request.json();

    // Validation: Check if required fields exist
    if (!body.personalInfo?.email || !body.auth?.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({
      "personalInfo.email": body.personalInfo.email
    });
    
    if (existingDoctor) {
      return NextResponse.json(
        { error: "Doctor with this email already exists" },
        { status: 409 }
      );
    }

    // Check password match
    if (body.auth.password !== body.auth.confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.auth.password, 10);

    // Prepare doctor data with proper type casting
    const doctorData = {
      personalInfo: {
        firstName: body.personalInfo.firstName || "",
        lastName: body.personalInfo.lastName || "",
        email: body.personalInfo.email,
        phone: body.personalInfo.phone || "",
        dateOfBirth: body.personalInfo.dateOfBirth 
          ? new Date(body.personalInfo.dateOfBirth) 
          : null,
        gender: body.personalInfo.gender || "",
        profilePhoto: body.personalInfo.profilePhoto || ""
      },
      professionalInfo: {
        licenseNumber: body.professionalInfo.licenseNumber || "",
        specialization: body.professionalInfo.specialization || [],
        yearsOfExperience: Number(body.professionalInfo.yearsOfExperience) || 0,
        qualifications: body.professionalInfo.qualifications || [],
        bio: body.professionalInfo.bio || "",
        languages: body.professionalInfo.languages || []
      },
      clinicInfo: {
        clinicName: body.clinicInfo.clinicName || "",
        address: {
          street: body.clinicInfo.address?.street || "",
          city: body.clinicInfo.address?.city || "",
          state: body.clinicInfo.address?.state || "",
          pincode: body.clinicInfo.address?.pincode || "",
          country: body.clinicInfo.address?.country || "India"
        },
        geoLocation: {
          latitude: Number(body.clinicInfo.geoLocation?.latitude) || 0,
          longitude: Number(body.clinicInfo.geoLocation?.longitude) || 0
        },
        contactNumber: body.clinicInfo.contactNumber || "",
        website: body.clinicInfo.website || ""
      },
      availability: {
        workingDays: body.availability?.workingDays || [],
        workingHours: {
          start: body.availability?.workingHours?.start || "",
          end: body.availability?.workingHours?.end || ""
        },
        sessionDuration: Number(body.availability?.sessionDuration) || 60,
        breakTime: {
          start: body.availability?.breakTime?.start || "",
          end: body.availability?.breakTime?.end || "",
          duration: body.availability?.breakTime?.duration || ""
        }
      },
      services: (body.services || []).map(service => ({
        name: service.name || "",
        description: service.description || "",
        duration: Number(service.duration) || 0,
        price: Number(service.price) || 0
      })),
      notifications: {
        email: body.notifications?.email !== false, // Default to true
        sms: body.notifications?.sms !== false,
        push: body.notifications?.push !== false
      },
      auth: {
        password: hashedPassword,
        emailVerified: false
      },
      status: "pending" // Add status field for admin approval
    };

    // Save to database
    const doctor = new Doctor(doctorData);
    await doctor.save();

    // Send welcome email
    const mailOptions = {
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
      await transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully to doctor");
    } catch (emailError) {
      console.log("Error sending email to doctor:", emailError);
      // Don't fail the request if email fails
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: doctor._id, 
        email: doctor.personalInfo.email,
        type: "doctor"
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set("doctortoken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Doctor registered successfully. Please wait for admin approval.",
        doctorId: doctor._id,
        status: "pending"
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Signup Error:", err);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "A doctor with this email already exists" },
        { status: 409 }
      );
    }
    
    // Handle validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(error => error.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}