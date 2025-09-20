import Connect from "@/mongodb/dbconnect";
import jwt from "jsonwebtoken";
import Patient from "@/models/user";
import bcryptjs from "bcryptjs";
import transporter from "@/nodemailer/nodemailer";

export const POST = async (req) => {
  await Connect();

  try {
    const { name, email, phone, age, address, gender, password } = await req.json();
    
    if (!name || !email || !phone || !age || !address || !gender || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }), 
        { status: 400 }
      );
    }
    
    const existingpatient = await Patient.findOne({ email });
    if (existingpatient) {
      return new Response(
        JSON.stringify({ error: "Patient already exists" }), 
        { status: 400 }
      );
    }
    
    const hasshedpassword = await bcryptjs.hash(password, 10);
    const newpatient = new Patient({
      name,
      email,
      phone,
      age,
      address,
      gender,
      password: hasshedpassword
    });
    
    await newpatient.save();

    // Sending the user welcome mail
    const mailoption = {
      from: process.env.SENDER_EMAIL,
      to: newpatient.email,
      subject: "Welcome to Panchakarma",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; text-align: center;">Welcome to Panchakarma Wellness!</h2>
          <p>Hello <strong>${newpatient.name}</strong>,</p>
          <p>We're thrilled to have you on board. Your journey to natural healing and wellness begins now.</p>
          <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">Your account has been successfully created with email: <strong>${newpatient.email}</strong></p>
          </div>
          <p>Best regards,<br>The Panchakarma Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="text-align: center; color: #6b7280; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailoption);
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the signup process if email fails
    }

    const token = jwt.sign(
      { patientid: newpatient._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // For API routes, we need to set the cookie in the response headers
    const response = new Response(
      JSON.stringify({ 
        message: "Patient created successfully", 
        patient: {
          id: newpatient._id,
          name: newpatient.name,
          email: newpatient.email
        }
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `patienttoken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    );

    return response;

  } catch (err) {
    console.error("Signup error:", err);
    return new Response(
      JSON.stringify({ error: "Server error. Please try again later." }),
      { status: 500 }
    );
  }
};