"use client";

import { Red_Hat_Display } from "next/font/google";
import React, { JSX, useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS } from "../../lib/helpers/localStorageKeys";
import { decodeJWT } from "../../lib/helpers/decoder";
import { ROUTES } from "../../lib/helpers/routes";

export const redHatDisplay = Red_Hat_Display({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const AuthenticatedLayout = ({
  children,
  pageTitle,
  pageSubTitle,
  buyButton,
  claimButton,
  claimAction,
  titlePath,
}: // subTitlePath
{
  children: any;
  claimAction?: any;
  pageTitle: string;
  pageSubTitle?: string;
  // subTitlePath: string;
  titlePath: string;
  buyButton?: boolean;
  claimButton?: boolean;
}): JSX.Element => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [sideBar, setSideBar] = useState(false);

  const userData:any = {}
    // typeof window !== "undefined"
    //   ? localStorage?.getItem(LOCAL_STORAGE_KEYS.USER)
    //   : null;

  const isTokenExpired = (token: string) => {
    const decoded = decodeJWT(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    }
    return true;
  };

  useEffect(() => {
    const users: any = userData ? JSON.parse(userData) : null;
    setUser(users);

    if (users && users.jwtToken) {
      const expired = isTokenExpired(users.jwtToken);
      setIsAuthenticated(!expired);
    }
  }, [userData]);

  useEffect(() => {
    if (userData === null || !isAuthenticated) {
      router.push(ROUTES.SIGNIN);
    }
  }, [userData, isAuthenticated, router]);

  return (
    <section className={`w-full h-screen flex ${redHatDisplay.className}`}>
      <Sidebar user={user} sideBar={sideBar} setSideBar={setSideBar} />
      <div className="w-full xlg:w-[85%] h-full flex flex-col overflow-y-auto bg-[#ffffff]">
        <Header
          pageTitle={pageTitle}
          pageSubTitle={pageSubTitle}
          buyButton={buyButton}
          claimButton={claimButton}
          claimAction={claimAction}
          setSideBar={setSideBar}
          user={user}
          // subTitlePath={subTitlePath}
          titlePath={titlePath}
        />
        {children}
      </div>
    </section>
  );
};

export default AuthenticatedLayout;
