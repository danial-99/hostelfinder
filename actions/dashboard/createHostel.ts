import prismadb from "@/app/lib/prisma";

export async function createHostel(formData: FormData) {
  try {
    const data = formData;
    console.log(data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
}
