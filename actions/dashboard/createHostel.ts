"use server";

import prismadb from "@/app/lib/prisma";
import { connect } from "http2";

export async function createHostel(formData: FormData, userId: string) {
  console.log("User ID:", userId);

  try {
    // Collect all necessary fields
    const hostelName = formData.get("hostelName") as string;
    const ownerName = formData.get("ownerName") as any;
    const hostelLocation = formData.get("hostelLocation") as string;
    const hostelType = formData.get("hostelType") as any;
    const roomDetails = formData.get("roomDetails") as string;
    const avatar = formData.get("avatar") as string;
    const images = Array.from(formData.getAll("image")) as Array<string>;
    console.log(images);
    // Validation: Check for missing required fields
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized access!",
        status: 401,
      };
    }

    // Create a new hostel entry
    const hostel = await prismadb.hostel.create({
      data: {
        name: hostelName,
        ownerName: ownerName,
        type: hostelType,
        description: roomDetails || "", // Fallback to empty string if undefined
        location: hostelLocation,
        ownerId: userId, // Use userId passed in as ownerId
        image: images,
        termsConditions: "no as such conditions for now",
        avatar: avatar,
      },
    });

    if (!hostel) {
      return {
        success: false,
        message: "Failed to create hostel",
        status: 500,
      };
    }

    return {
      success: true,
      message:
        "Hostel created successfully. You will be notified once it's approved.",
      status: 201,
      data: hostel,
    };
  } catch (error) {
    console.error("Error creating hostel:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
}
