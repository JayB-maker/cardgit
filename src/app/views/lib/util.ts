import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, SessionData, sessionOptions } from "./session";

export async function getSession() {
    // Await the result of cookies() to get the actual cookies
    const cookieStore = await cookies();

    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    // If the user visits for the first time, session returns an empty object.
    // Add the `isLoggedIn` property with its default value if it doesn't exist.
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
