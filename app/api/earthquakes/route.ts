import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Accept": "application/json",
          "User-Agent": "EarthquakeHubApp/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`USGS returned status ${response.status}`);
    }

    const data = await response.json();
    const featureList = data?.features || [];

    const earthquakes = featureList.map((item: any) => {
      const coordinates = item?.geometry?.coordinates || [];
      return {
        id: item?.id,
        place: item?.properties?.place ?? "Unknown Location",
        magnitude: item?.properties?.mag ?? 0,
        time: item?.properties?.time,
        updated: item?.properties?.updated,
        depth: coordinates[2] ?? 0,
        lon: coordinates[0] ?? 0,
        lat: coordinates[1] ?? 0,
        tsunami: item?.properties?.tsunami === 1,
        alert: item?.properties?.alert ?? null,
        status: item?.properties?.status,
        significance: item?.properties?.sig,
        felt: item?.properties?.felt ?? 0,
        magType: item?.properties?.magType,
        sourceUrl: item?.properties?.url,
      };
    });

    return NextResponse.json(
      { success: true, count: earthquakes.length, earthquakes, lastUpdated: new Date().toISOString() },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, earthquakes: [], message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
