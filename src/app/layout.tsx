import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./views/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardgit",
  description: "CardGit - Interactive Digital Business Cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_APP_GOOGLE_CLIENT_ID as string;

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* <SessionProvider> */}
        <GoogleOAuthProvider clientId={clientId}>
          <Suspense
            fallback={
              <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <h1>Oops, Something went wrong</h1>
                <p>Check your network and try again</p>
              </div>
            }
          >
            {children}
            <ToastContainer />
          </Suspense>
        </GoogleOAuthProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
