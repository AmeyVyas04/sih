// models/Admin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Remove index: true if you have it
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'moderator'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String
  },
  permissions: {
    canManageTherapies: { type: Boolean, default: true },
    canManageDoctors: { type: Boolean, default: true },
    canManagePatients: { type: Boolean, default: true },
    canManageBookings: { type: Boolean, default: true },
    canManageAdmins: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Define indexes only once here (not in the field definitions)
AdminSchema.index({ email: 1 }); // Remove if you have index: true in email field
AdminSchema.index({ role: 1 });
AdminSchema.index({ isActive: 1 });

// Pre-save middleware
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.isLocked && this.lockUntil > Date.now()) {
    throw new Error('Account is temporarily locked');
  }
  
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    
    if (isMatch) {
      if (this.loginAttempts > 0) {
        this.loginAttempts = 0;
        this.lockUntil = undefined;
        await this.save();
      }
      return true;
    } else {
      this.loginAttempts += 1;
      if (this.loginAttempts >= 5) {
        this.lockUntil = Date.now() + 30 * 60 * 1000;
      }
      await this.save();
      return false;
    }
  } catch (error) {
    throw error;
  }
};

// Check if account is locked
AdminSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Static method to find by email
AdminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// Public profile method
AdminSchema.methods.getPublicProfile = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.loginAttempts;
  delete admin.lockUntil;
  return admin;
};

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);