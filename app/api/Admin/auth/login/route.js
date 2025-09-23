// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import Connect from '@/mongodb/dbconnect';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await Connect();

    const { email, password, rememberMe } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if locked
    if (admin.isLocked()) {
      return NextResponse.json(
        { success: false, error: 'Account temporarily locked. Try again later.' },
        { status: 423 }
      );
    }

    // Check if active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, error: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '1d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: admin.getPublicProfile(),
        token
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add GET method to handle incorrect requests
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}