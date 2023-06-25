import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: {
  query: { latitude: any; longitude: any };
}) {
  try {
    const API_KEY = "AIzaSyBiVr3N5E4oa0pBJ8Q8m64UFBk5M0JtdXw";
    const { latitude, longitude } = request.query;
    const DATA_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=hospital&keyword=hospital&key=${API_KEY}`;

    const res = await fetch(DATA_URL, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hospitals");
    }

    const hospitals: Hospital[] = await res.json();
    console.log(hospitals, "hospitals");

    return NextResponse.json({ hospitals });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.error();
  }
}
