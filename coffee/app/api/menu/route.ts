// app/api/menu/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MenuItem from "@/app/models/MenuItem";

export async function GET() {
  try {
    await connectToDatabase();
    const menuItems = await MenuItem.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: menuItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newItem = await MenuItem.create(body);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create menu item" },
      { status: 400 }
    );
  }
}