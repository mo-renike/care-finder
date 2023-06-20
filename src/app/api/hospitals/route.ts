import { NextResponse } from "next/server";

export async function GET(req: { query: { latitude: any; longitude: any } }) {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { latitude, longitude } = req.query;
  const DATA_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=hospital&keyword=hospital&key=${API_KEY}`;
  const res = await fetch(DATA_URL);
  const hospitals: Hospital[] = await res.json();
  return NextResponse.json(hospitals);
}
