// models/Schedule.js
import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  therapyId: {
    type: Number,
    required: true
  },
  doctorId: {
    type: String,
    default: "default-doctor-id"
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  patientDetails: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    medicalHistory: {
      type: String,
      default: ''
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled', 'completed'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
export default Schedule;