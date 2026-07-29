import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; 
import AboutData from "@/app/models/AboutData";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch the single about configuration document
    const aboutData = await AboutData.findOne({});

    if (!aboutData) {
      return NextResponse.json(
        { error: "No data found in aboutdata collection." },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch about page data", details: error.message },
      { status: 500 }
    );
  }
}