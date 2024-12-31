"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import useSession from "../views/lib/hooks/useSession";
import PageLoaderModal from "../views/components/Loader/PageLoaderModal";
import { ROUTES } from "../views/lib/helpers/routes";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (session?.isLoggedIn) {
        if (session?.isVerified) {
          if (session?.is_profile_updated) {
            router?.push(ROUTES?.DASHBOARD);
          } else {
            router?.push(ROUTES?.WALK_THROUGH);
          }
        } else {
          router?.push("auth/signup?pageQuery=verification");
        }
      } else {
        router.push(ROUTES?.SIGNIN);
      }
    }
  }, [session, isLoading]);

  if (isLoading) return <PageLoaderModal />;

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
