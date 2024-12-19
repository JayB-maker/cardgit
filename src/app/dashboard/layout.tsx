"use client";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSession from "../views/lib/hooks/useSession";
import PageLoaderModal from "../views/components/Loader/PageLoaderModal";
import { ROUTES } from "../views/lib/helpers/routes";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, isLoading } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
  }, []);

  if (isLoading) return <PageLoaderModal />;

  return <>{children}</>;
}
