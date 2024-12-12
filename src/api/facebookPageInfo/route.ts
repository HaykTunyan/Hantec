import { NextResponse } from "next/server";
import axios from "axios";

const PAGE_ID = "8056220967790854";
// const ACCESS_TOKEN = "YOUR_PAGE_ACCESS_TOKEN";

export async function GET() {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v20.0/${PAGE_ID}?fields=name,fan_count,website,speed_ranking`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch page information" }, { status: 500 });
  }
}
