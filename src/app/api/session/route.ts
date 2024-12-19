import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  sessionOptions,
  SessionData,
  defaultSession,
} from "../../views/lib/session";
import { getSession } from "../../views/lib/util";
// import { getSession } from "../../lib/util";

// Login: Create a session
export async function POST(request: NextRequest) {

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  // Extract email from the request body
  const { email } = (await request.json()) as { email: string };

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  // Set session values
  session.isLoggedIn = true;
  session.email = email; // Use email instead of username
  await session.save();

  return new Response(JSON.stringify({ success: true, session }), {
    status: 200,
  });
}

// Update session expiration date
export async function PATCH() {
  const session = await getSession();

  session.updateConfig({
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      expires: new Date("2024-12-27T00:00:00.000Z"), // Custom expiration date
    },
  });
  await session.save();

  return new Response(JSON.stringify({ success: true, session }), {
    status: 200,
  });
}

// Read session: Get session details
export async function GET() {
  const session = await getSession();

  if (session.isLoggedIn !== true) {
    return new Response(JSON.stringify(defaultSession), { status: 200 });
  }

  return new Response(
    JSON.stringify(session),
    { status: 200 }
  );
}

// Logout: Destroy the session
export async function DELETE() {
  const session = await getSession();

  session.destroy();

  return new Response(JSON.stringify(defaultSession), { status: 200 });
}
