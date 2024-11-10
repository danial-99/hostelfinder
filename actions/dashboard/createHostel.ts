// "use server";

// import prismadb from "@/app/lib/prisma";
// import { connect } from "http2";

// export async function createHostel(formData: FormData, userId: string) {
//   console.log("User ID:", userId);

//   try {
//     // Collect all necessary fields
//     const hostelName = formData.get("hostelName") as string;
//     const ownerName = formData.get("ownerName") as any;
//     const hostelLocation = formData.get("hostelLocation") as string;
//     const hostelType = formData.get("hostelType") as any;
//     const roomDetails = formData.get("roomDetails") as string;
//     const avatar = formData.get("avatar") as string;
//     const images = Array.from(formData.getAll("image")) as Array<string>;
//     console.log(images);
//     // Validation: Check for missing required fields
//     if (!userId) {
//       return {
//         success: false,
//         message: "Unauthorized access!",
//         status: 401,
//       };
//     }

//     // Create a new hostel entry
//     const hostel = await prismadb.hostel.create({
//       data: {
//         name: hostelName,
//         ownerName: ownerName,
//         type: hostelType,
//         description: roomDetails || "", // Fallback to empty string if undefined
//         location: hostelLocation,
//         ownerId: userId, // Use userId passed in as ownerId
//         image: images,
//         termsConditions: "no as such conditions for now",
//         avatar: avatar,
//       },
//     });

//     if (!hostel) {
//       return {
//         success: false,
//         message: "Failed to create hostel",
//         status: 500,
//       };
//     }

//     return {
//       success: true,
//       message:
//         "Hostel created successfully. You will be notified once it's approved.",
//       status: 201,
//       data: hostel,
//     };
//   } catch (error) {
//     console.error("Error creating hostel:", error);
//     return {
//       success: false,
//       message: "Internal server error",
//       status: 500,
//     };
//   }
// }
"use server";

import { cookies } from "next/headers";
import prismadb from "@/app/lib/prisma";

// Define the expected structure of the incoming form data

type HostelType = "female" | "male" | "other"; // Adjust based on your actual type

interface HostelFormData {
  hostelData: {
    hostelName: string;
    ownerName: string;
    email: string;
    country: string;
    province: string;
    city: string;
    zipCode: string;
    hostelType: HostelType;
    cnic: string;
    description: string;
    phoneNumber: string;
    userId: string;
   };
  roomData: {
    totalRooms: string;
    totalBeds: string;
    hasOneBedRooms: boolean;
    hasTwoBedRooms: boolean;
    hasThreeBedRooms: boolean;
    hasFourBedRooms: boolean;
    oneBedRoomPrice: number;
    twoBedRoomPrice: number;
    threeBedRoomPrice: number;
    fourBedRoomPrice: number;
    paymentMethods: string[];
  };
  facilitiesData: {
    [key: string]: boolean; // This will allow for dynamic facilities
  };
  imageUploadData: {
    logo: string | null;
    hostelImages: string[];
  };
}

export async function createHostel(formData: FormData) {
  try {
    // Parse formData
    const hostelData = JSON.parse(
      formData.get("hostelData") as string
    ) as HostelFormData["hostelData"];
    const roomData = JSON.parse(
      formData.get("roomData") as string
    ) as HostelFormData["roomData"];
    const facilitiesData = JSON.parse(
      formData.get("facilitiesData") as string
    ) as HostelFormData["facilitiesData"];
    const imageUploadData = JSON.parse(
      formData.get("imageUploadData") as string
    ) as HostelFormData["imageUploadData"];

    const hostelType = (hostelData.hostelType === 'female') ? 'GIRLS' : 'BOYS';

    // Step 1: Create the Hostel
    const hostel = await prismadb.hostel.create({
      data: {
        name: hostelData.hostelName,
        ownerName: hostelData.ownerName,
        location: `${hostelData.country}, ${hostelData.province}, ${hostelData.city}`,
        type: hostelType,
        description: hostelData.description,
        avatar: imageUploadData.logo || "",
        image: imageUploadData.hostelImages,
        termsConditions: "Standard Terms",
        status: "PENDING",
        User: { connect: { id: hostelData.userId } },
      },
    });

    // Step 2: Create HostelRooms based on roomData
    const roomPromises = [];
    if (roomData.hasOneBedRooms) {
      roomPromises.push(
        prismadb.hostelRooms.create({
          data: {
            hostelId: hostel.id,
            name: "1-Bed Room",
            description: "Single Bed Room",
            bedseats: 1,
            price: roomData.oneBedRoomPrice,
            image: "default.jpg",
          },
        })
      );
    }
    if (roomData.hasTwoBedRooms) {
      roomPromises.push(
        prismadb.hostelRooms.create({
          data: {
            hostelId: hostel.id,
            name: "2-Bed Room",
            description: "Double Bed Room",
            bedseats: 2,
            price: Number(roomData.twoBedRoomPrice),
            image: "default.jpg",
          },
        })
      );
    }
    await Promise.all(roomPromises);

    // Step 3: Create HostelFacilities based on facilitiesData
    const facilityPromises = [];
    for (const [facilityName, isAvailable] of Object.entries(facilitiesData)) {
      if (isAvailable) {
        const facility = await prismadb.facility.findUnique({
          where: { name: facilityName },
          select: { id: true },
        });

        if (facility) {
          facilityPromises.push(
            prismadb.hostelFacilities.create({
              data: {
                hostelId: hostel.id,
                facilityId: facility.id,
                isAvailable: true,
              },
            })
          );
        } else {
          console.error(`Facility '${facilityName}' not found.`);
        }
      }
    }
    await Promise.all(facilityPromises);

    return {
      status: 201,
      success: true,
      message: "Hostel created successfully",
      data: hostel,
    };
  } catch (error) {
    console.error("[CREATE_HOSTEL_ERROR]", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}
