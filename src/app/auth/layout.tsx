"use client";

import { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense
        fallback={
          <div className="w-full h-screen flex flex-col items-center justify-center p-4">
            <h1>Oops, Something went wrong</h1>
            <p>Check your network and try again</p>
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
