import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Connect from "@/mongodb/dbconnect";
import Feedback from "@/models/feedback";
import jwt from "jsonwebtoken";

// Function to get patient ID from cookie token
// In your backend, use a valid ObjectId format
async function getPatientIdFromToken() {
  try {
    const cookieStore = await cookies();
    const patientToken = cookieStore.get("patienttoken")?.value;

    if (!patientToken) {
      console.log("no token");
    }

    const decoded = jwt.verify(
      patientToken,
      process.env.JWT_SECRET || "fallback-secret-key"
    );
    return decoded.patientId || decoded.Patientid || decoded._id;
  } catch (error) {
    console.error("Token verification error:", error);
    // Use a valid ObjectId format
    return "507f1f77bcf86cd799439011";
  }
}

// POST - Create new feedback
// POST - Create new feedback
export async function POST(request) {
  try {
    await Connect();

    const patientId = await getPatientIdFromToken();

    const body = await request.json();

    // Required field validation
    const requiredFields = [
      "therapyId",
      "therapyType",
      "appointmentId",
      "appointmentDate",
      "therapistId",
      "therapistName",
      "overallRating",
      "comfortLevel",
      "doshaBalance",
      "therapistGuidance",
      "oilSuitability",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // REMOVE the duplicate check since we're using string IDs
    // Or modify it to work with strings:

    const feedbackData = {
      patientId,
      therapyId: body.therapyId,
      therapyType: body.therapyType,
      appointmentId: body.appointmentId, // Keep as string
      appointmentDate: new Date(body.appointmentDate),
      therapistId: body.therapistId,
      therapistName: body.therapistName,
      overallRating: body.overallRating,
      comfortLevel: body.comfortLevel,
      doshaBalance: body.doshaBalance,
      therapistGuidance: body.therapistGuidance,
      oilSuitability: body.oilSuitability,
      postTherapyEffects: body.postTherapyEffects || [],
      comments: body.comments || "",
      wouldRecommend: body.wouldRecommend,
      status: "submitted",
    };

    const feedback = await Feedback.create(feedbackData);

    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
