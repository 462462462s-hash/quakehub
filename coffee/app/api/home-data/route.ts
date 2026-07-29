import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; // Ensure path matches your structure
import { HomePageData } from "@/app/models/PageData";

export async function GET() {
  try {
    await connectToDatabase();
    
    let pageData = await HomePageData.findOne();

    // Seed default data if database collection is empty
    if (!pageData) {
      pageData = await HomePageData.create({
        announcementText: "Welcome to the Lumen Coffee Experience",
        heroBadge: "FRESHLY ROASTED DAILY",
        heroHeading: "Crafted for the quiet moments before the world wakes up.",
        heroDescription: "Sourced ethically from high-altitude volcanic soils, slow-roasted in small batches to preserve natural notes of chocolate, berries, and smoke.",
        heroPrimaryBtnText: "Explore Menu",
        heroSecondaryBtnText: "Join Customer Club",
        heroCardTag: "Signature Roast",
        heroCardTitle: "Velvet Mocha Reserve",
        heroCardSubtitle: "Dark Roast • Cocoa & Smoked Vanilla Notes",
        heroCardImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
        documentaryTitle: "From High-Altitude Farms to Your Cup",
        documentaryDescription: "Take a visual journey into how high-elevation soil gives our beans their distinct taste profile.",
        youtubeVideoId: "RJlRLt31CFU",
        products: []
      });
    }

    return NextResponse.json({ success: true, data: pageData });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch page data" },
      { status: 500 }
    );
  }
}