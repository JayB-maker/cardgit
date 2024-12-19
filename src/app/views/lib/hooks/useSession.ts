import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { defaultSession, SessionData } from "../session";

const sessionApiRoute = "/api/session";

// Utility function to make JSON fetch requests
async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

// Function to handle login by sending a POST request with email
function doLogin(url: string, { arg }: { arg: string }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ email: arg }), // Updated to use email instead of username
  });
}

// Function to handle logout by sending a DELETE request
function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

// Hook to manage the session state
export default function useSession() {
  // Fetch session data using SWR
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession, // Fallback session data when none is available
    }
  );

  // Use SWRMutation for login
  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    revalidate: false, // No revalidation needed after login; POST response contains updated session info
  });

  // Use SWRMutation for logout
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, login, isLoading };
}
