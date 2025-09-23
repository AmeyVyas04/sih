// app/api/admin/signup/route.js
import { NextResponse } from 'next/server';
import Connect from '@/mongodb/dbconnect';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await Connect();

    const { email, password, confirmPassword } = await request.json();

    // Validation
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password,
      role: 'admin',
      profile: {
        firstName: '',
        lastName: ''
      }
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response with admin data (excluding password)
    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      data: {
        admin: admin.getPublicProfile(),
        token
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Admin signup error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET method to check if admin exists (for frontend validation)
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    
    return NextResponse.json({
      success: true,
      data: {
        exists: !!existingAdmin
      }
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}