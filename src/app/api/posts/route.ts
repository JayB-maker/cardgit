import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from the free API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Return the data as JSON
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
