const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    // Change all ObjectId fields to String
    patientId: {
      type: mongoose.Schema.ObjectId, // Changed from ObjectId to String
      ref: "Patient",
    },
    therapyId: {
      type: String, // Changed from ObjectId to String
      required: true,
    },
    therapyType: {
      type: String,
      required: true,
      enum: [
        "Abhyanga",
        "Shirodhara",
        "Basti",
        "Virechana",
        "Nasya",
        "Consultation",
      ],
    },
    appointmentId: {
      type: String, // Changed from ObjectId to String
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    therapistId: {
      type: String, // Changed from ObjectId to String
      required: true,
    },
    therapistName: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comfortLevel: {
      type: String,
      enum: ["Very Comfortable", "Comfortable", "Uncomfortable"],
      required: true,
    },
    doshaBalance: {
      type: String,
      enum: ["Yes", "Not Sure", "No"],
      required: true,
    },
    therapistGuidance: {
      type: String,
      enum: ["Yes", "Somewhat", "No"],
      required: true,
    },
    oilSuitability: {
      type: String,
      enum: ["Perfectly suited", "Mild irritation", "Too oily"],
      required: true,
    },
    postTherapyEffects: [
      {
        type: String,
        enum: [
          "Better Digestion",
          "Improved Sleep",
          "Stress Relief",
          "Increased Energy",
          "Better Skin Health",
          "Reduced Pain",
          "Mental Clarity",
          "Improved Immunity",
        ],
      },
    ],
    comments: {
      type: String,
      maxlength: 1000,
    },
    wouldRecommend: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ["submitted", "reviewed", "action_required", "resolved"],
      default: "submitted",
    },
    adminNotes: [
      {
        note: String,
        adminId: String, // Changed to String
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
