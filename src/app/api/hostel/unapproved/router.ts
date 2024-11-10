// /app/api/hostel/unapproved.ts
console.log("Running the unapproved API route");

import { NextResponse } from "next/server";
import { getHostels } from "../../../../../actions/dashboard/getHostels";

export async function GET() {
    console.log("HELLO - Route is working");
  const response = await getHostels(true); // Only fetch unapproved hostels

  return NextResponse.json(response, { status: response.status });
}
