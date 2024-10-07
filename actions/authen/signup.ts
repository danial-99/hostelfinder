"use server"


import prismadb from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

enum UserRole {
  SUPER_ADMIN,
  ADMIN,
  USER
}

export async function signUp(formData: FormData) {
  try {
    const name = formData.get('username') as string;
    const role = formData.get('role') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const termsConditions = formData.get('terms&Conditions') as string;

    if (!name) return { status: 400, success: false, message: "Name is required", error: "Name is required" };
    if (!role) return { status: 400, success: false, message: "Role is required", error: "Role is required" };
    if (!email) return { status: 400, success: false, message: "Email is required", error: "Email is required" };
    if (!password) return { status: 400, success: false, message: "Password is required", error: "Password is required" };
    if (!termsConditions) return { status: 400, success: false, message: "Terms & Conditions acceptance is required", error: "Terms & Conditions acceptance is required" };

    // Check if user already exists
    const existingUser = await prismadb.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { status: 409, success: false, message: "User with this email already exists", error: "User with this email already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        name,
        role,
        email,
        password: hashedPassword,
        termsConditions: termsConditions === 'on'
      }
    });

    return { 
      status: 201, 
      success: true, 
      message: "User created successfully", 
      data: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    };
  } catch (error) {
    console.error("[USER_SIGNUP]", error);
    return { 
      status: 500, 
      success: false, 
      message: "An unexpected error occurred. Please try again.", 
      error: "Internal server error" 
    };
  }
}
