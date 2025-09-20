  const mongoose = require('mongoose');

  const doctorSchema = new mongoose.Schema({
    // Personal Information
    personalInfo: {
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
      },
      phone: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: Date,
        required: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
      },
      profilePhoto: {
        type: String, // URL to stored image
        default: ''
      }
    },

    // Professional Information
    professionalInfo: {
      licenseNumber: {
        type: String,
        required: true,
        unique: true
      },
      specialization: {
        type: [String], // Array of specializations
        required: true,
        enum: [
          'Panchakarma Therapy', 
          'Abhyanga', 
          'Shirodhara', 
          'Basti', 
          'Nasya', 
          'Raktamokshana',
          'Ayurvedic Nutrition',
          'Yoga Therapy',
          'Pranayama',
          'Marma Therapy'
        ]
      },
      yearsOfExperience: {
        type: Number,
        required: true,
        min: 0
      },
      qualifications: [{
        degree: {
          type: String,
          
        },
        institution: {
          type: String,
          
        },
        year: {
          type: Number,
          
        }
      }],
      bio: {
        type: String,
        maxlength: 1000
      },
      languages: [{
        type: String,
        enum: ['English', 'Hindi', 'Sanskrit', 'Marathi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Other']
      }]
    },

    // Clinic Information
    clinicInfo: {
      clinicName: {
        type: String,
        required: true
      },
      address: {
        street: String,
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        pincode: {
          type: String,
          required: true
        },
        country: {
          type: String,
          default: 'India'
        }
      },
      geoLocation: {
        latitude: Number,
        longitude: Number
      },
      contactNumber: {
        type: String,
        required: true
      },
      website: {
        type: String,
        default: ''
      }
    },

    // Availability & Scheduling
    availability: {
      workingDays: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }],
      workingHours: {
        start: {
          type: String, // Store as "HH:MM" format
          required: true
        },
        end: {
          type: String, // Store as "HH:MM" format
          required: true
        }
      },
      sessionDuration: {
        type: Number, // in minutes
        default: 60,
        min: 30,
        max: 120
      },
      breakTime: {
        start: String,
        end: String,
        duration: Number // in minutes
      }
    },

    // Services Offered
    services: [{
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      duration: {
        type: Number, // in minutes
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],

    // Authentication
    auth: {
      password: {
        type: String,
        required: true,
        minlength: 8
      },
      emailVerified: {
        type: Boolean,
        default: false
      },
      verificationToken: String,
      resetPasswordToken: String,
      resetPasswordExpires: Date
    },

    // Account Status
    accountStatus: {
      type: String,
      enum: ['Pending', 'Active', 'Suspended', 'Rejected'],
      default: 'Pending'
    },
    rejectionReason: {
      type: String,
      default: ''
    },

    // Ratings and Reviews
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      totalReviews: {
        type: Number,
        default: 0
      }
    },

    // Documents (For verification)
    documents: [{
      documentType: {
        type: String,
        enum: ['License', 'Degree', 'ID Proof', 'Clinic Registration', 'Other']
      },
      documentUrl: String,
      verified: {
        type: Boolean,
        default: false
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Notification Preferences
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    lastLogin: {
      type: Date
    }
  });

  // Update the updatedAt field before saving
  doctorSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

 const Doctor =mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;