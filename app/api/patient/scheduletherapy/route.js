// app/api/patient/scheduletherapy/route.js
import Connect from "@/mongodb/dbconnect";
import Schedule from "@/models/schedule";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import transporter from "@/nodemailer/nodemailer";
export async function POST(request) {
    await Connect();

    try {
        // Get cookies using next/headers
        const cookieStore = await cookies();
        const token = cookieStore.get("patienttoken")?.value;
        
        console.log("Token from cookies:", token);

        if (!token) {
            return new Response(JSON.stringify({ error: "Please Login First" }), { 
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
        } catch (jwtError) {
            console.error("JWT Error:", jwtError);
            return new Response(JSON.stringify({ error: "Invalid or Expired Token" }), { 
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Debug: Check all properties in decoded token
        console.log("All decoded token properties:", Object.keys(decoded));
        console.log("Patientid value:", decoded.Patientid);
        console.log("Patientid type:", typeof decoded.Patientid);

        if (!decoded) {
            return new Response(JSON.stringify({ error: "Invalid Token Data" }), { 
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const body = await request.json();
        console.log("Request body:", body);

        // Validate required fields
        if (!body.therapyId || !body.date || !body.time) {
            return new Response(JSON.stringify({ error: "Missing required fields: therapyId, date, time" }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get owner from token - handle different possible property names
        let ownerId = decoded.Patientid || decoded.patientId || decoded.patientid || decoded.id || decoded._id;
        
        console.log("Extracted ownerId:", ownerId);

        if (!ownerId) {
            return new Response(JSON.stringify({ 
                error: "Unable to identify patient from token",
                tokenDetails: Object.keys(decoded)
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create booking data
        const bookingData = {
            owner: ownerId,
            therapyId: body.therapyId,
            doctorId: body.doctorId || "default-doctor-id",
            date: body.date,
            time: body.time,
            patientDetails: body.patientDetails || {},
            totalAmount: body.totalAmount || 0,
            status: 'confirmed'
        };

        console.log("Booking data to save:", bookingData);

        const newSchedule = new Schedule(bookingData);
        await newSchedule.save();
        
        console.log("Schedule saved successfully"); 
        console.log("Saved schedule ID:", newSchedule._id);
        
        // sending confirmation email
        // ...existing code...

        // sending confirmation email
        if (body.patientDetails?.email) {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: body.patientDetails.email,
                subject: "Your Therapy Session is Confirmed!",
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2>Therapy Session Confirmation</h2>
                        <p>Dear ${body.patientDetails.name || "Patient"},</p>
                        <p>Your therapy session has been successfully scheduled.</p>
                        <ul>
                            <li><strong>Therapy:</strong> ${body.therapyName || "Selected Therapy"}</li>
                            <li><strong>Date:</strong> ${body.date}</li>
                            <li><strong>Time:</strong> ${body.time}</li>
                        </ul>
                        <p>If you have any questions or need to reschedule, please contact us.</p>
                        <br>
                        <p>Thank you for choosing us!</p>
                        <p>Best regards,<br/>The Therapy Center Team</p>
                    </div>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log("Confirmation email sent to:", body.patientDetails.email);
            } catch (mailError) {
                console.error("Error sending confirmation email:", mailError);
            }
        }

        return new Response(JSON.stringify({ 
            message: "Therapy Scheduled Successfully",
            bookingId: newSchedule._id,
            schedule: newSchedule 
        }), { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Server Error:", error);
        
        // More specific error handling
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message;
            });
            
            return new Response(JSON.stringify({ 
                error: "Validation Error",
                details: validationErrors
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({ 
            error: "Internal Server Error",
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}