"use client";

import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.svg";
import CloseIcon from "../../assets/images/close-icon.svg";
import GreenDashboardIcon from "../../assets/images/dashboard-green-icon.svg";
import GrayDashboardIcon from "../../assets/images/dashboard-gray-icon.svg";
import GraySetUpIcon from "../../assets/images/setup-gray-icon.svg";
import GreenSetUpIcon from "../../assets/images/setup-green-icon.svg";
import GreenPolicyIcon from "../../assets/images/policy-green-icon.svg";
import GrayPolicyIcon from "../../assets/images/policy-gray-icon.svg";
import GrayClaimIcon from "../../assets/images/claim-gray-icon.svg";
import ImageAvatar from "../../assets/images/avatar.png";
import ChevronRight from "../../assets/images/chevron-right.svg";
import ChevronDown from "../../assets/images/chevron-down.svg";
import ChevronUp from "../../assets/images/chevron-up.svg";
import BackBackground from "../../assets/images/back-background-icon.svg";
import BusinessInsurance from "../../assets/images/business-insurance-icon.svg";
import PersonalInsurance from "../../assets/images/personal-insurance-icon.svg";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ROUTES } from "../../lib/helpers/routes";

export default function Sidebar({
  user,
  sideBar,
  setSideBar,
}: {
  user: any;
  sideBar?: boolean;
  setSideBar?: any;
}) {
  const [menuClicked, setMenuClicked] = useState<string>("");

  const router = useRouter();
  const { menu } = router.query;
  const ActiveLink = (href: string) => router.pathname.startsWith(href);

  const handleLogout = () => {
    localStorage.clear();
    Router.push(ROUTES.SIGNIN);
  };

  useEffect(() => {
    if (router.pathname.startsWith("/dashboard/policy/personal")) {
      setMenuClicked("policyPersonalInsurance");
    } else if (router.pathname.startsWith("/dashboard/policy")) {
      setMenuClicked("policyBusinessInsurance");
    } else if (router.pathname.startsWith("/dashboard/claim/personal")) {
      setMenuClicked("claimPersonalInsurance");
    } else if (router.pathname.startsWith("/dashboard/claim")) {
      setMenuClicked("claimBusinessInsurance");
    }
  }, [router.pathname]);

  const handleMenuClick = (menu: string) => {
    if (menuClicked === menu) {
      setMenuClicked("");
    } else {
      setMenuClicked(menu);
    }
  };

  const handleMenuRoute = (menu: string) => {
    router.push({
      pathname: `${router?.pathname}`,
      query: { menu: menu },
    });
  };

  const handleBackRoute = () => {
    router.push({
      pathname: `/dashboard`,
      query: { menu: "" },
    });
  };

  return (
    <>
      <div
        className={`w-[300px] shadow-lg xlg:w-[20%] py-[21px] px-8 bg-[#F8FBFA] xlg:block fixed h-full z-[10] xlg:relative ${
          sideBar ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between w-full items-center">
          <Image
            src={Logo}
            alt="Logo"
            className="w-[40%] xlg:w-unset cursor-pointer "
            onClick={() => router.push(ROUTES?.DASHBOARD)}
          />
          <Image
            src={CloseIcon}
            alt="close-icon"
            onClick={() => setSideBar(false)}
            className="cursor-pointer xlg:hidden"
          />
        </div>

        {menu === "" ||
        router.asPath === "/dashboard" ||
        router.asPath === "/dashboard/settings" ? (
          <ul className="w-full flex-1 flex flex-col gap-y-2 overflow-y-auto pt-[79px]">
            <Link href={ROUTES.DASHBOARD}>
              <li
                className={`flex items-center py-2 px-3 cursor-pointer ${
                  ActiveLink(ROUTES.DASHBOARD) &&
                  "bg-[#80B599] bg-opacity-20 rounded-[32px]"
                }`}
              >
                <Image
                  src={
                    ActiveLink(ROUTES.DASHBOARD)
                      ? GreenDashboardIcon
                      : GrayDashboardIcon
                  }
                  alt="Dashboard Icon"
                  width={20}
                  height={20}
                  className="pr-2"
                />
                <span
                  className={`text-sm ${
                    ActiveLink(ROUTES.DASHBOARD) ||
                    router.pathname.includes(ROUTES.DASHBOARD)
                      ? "text-primaryBlue font-semibold"
                      : "text-[#4D5154] font-normal hover:text-incoverDimGreen"
                  }`}
                >
                  Dashboard
                </span>
              </li>
            </Link>
            <p className="text-[12px] leading-[16px] font-normal py-2 px-3 text-[#4D5154] pt-[44px]">
              INSURANCE
            </p>
            <div onClick={() => handleMenuRoute("policy")}>
              <li className="flex items-center justify-between cursor-pointer">
                <div className={`text-sm flex items-center gap-2 py-2 px-3 `}>
                  <Image
                    src={GrayPolicyIcon}
                    alt="Policy Icon"
                    width={20}
                    height={20}
                  />
                  <span className={`text-sm`}>My Policies</span>
                </div>
                <Image src={ChevronRight} alt="chevron" />
              </li>
            </div>
            <div onClick={() => handleMenuRoute("claim")}>
              <li className="flex items-center justify-between cursor-pointer">
                <div className={`text-sm flex items-center gap-2 py-2 px-3`}>
                  <Image
                    src={GrayClaimIcon}
                    alt="Claim Icon"
                    width={20}
                    height={20}
                  />
                  <span className={`text-sm`}>My Claims</span>
                </div>
                <Image src={ChevronRight} alt="chevron" />
              </li>
            </div>
          </ul>
        ) : menu === "policy" || ActiveLink("/dashboard/policy") ? (
          <ul className="w-full flex-1 flex flex-col gap-y-2 overflow-y-auto pt-[79px]">
            <div onClick={handleBackRoute} className="pb-[44px]">
              <li
                className={`flex items-center py-2 px-3 cursor-pointer gap-2`}
              >
                <Image src={BackBackground} alt="back-background" />
                <span className={`text-sm`}>My Policies</span>
              </li>
            </div>

          </ul>
        ) : (
          (menu === "claim" || ActiveLink("/dashboard/claim")) && (
            <ul className="w-full flex-1 flex flex-col gap-y-2 overflow-y-auto pt-[79px]">
              <div onClick={handleBackRoute} className="pb-[44px]">
                <li
                  className={`flex items-center py-2 px-3 cursor-pointer gap-2`}
                >
                  <Image src={BackBackground} alt="back-background" />
                  <span className={`text-sm`}>My Claims</span>
                </li>
              </div>

            </ul>
          )
        )}
        <div className="absolute bottom-[50px]">
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton
                  className={`flex items-center justify-between min-w-[177px] w-full px-2 py-[12px] text-[12px] leading-4 font-semibold text-[#4D5154] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent ${
                    open &&
                    "rounded-t-[12px] border border-b-0 border-[#C8CCD0] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={ImageAvatar}
                      alt="Avatar"
                      width={32}
                      height={32}
                    />
                    <p className="ml-3">{user?.FirstName ?? "Guest"}</p>
                  </div>
                  <Image src={open ? ChevronUp : ChevronDown} alt="chevron" />
                </DisclosureButton>
                <DisclosurePanel className="grid gap-[13px] bg-white min-w-[177px] w-full rounded-b-[12px] border border-t-0 border-[#C8CCD0]">
                  <div className="border-t border-[#C8CCD0] pt-[13px] px-2 flex flex-col">
                    <Link href={ROUTES.SETTINGS}>Settings</Link>
                    <Link
                      href="/contact"
                      className="pt-3 cursor-pointer"
                      target="_blank"
                    >
                      Support
                    </Link>
                  </div>
                  <div className="border-t px-2 pt-[13px] pb-3 border-[#C8CCD0] cursor-pointer">
                    <div onClick={() => handleLogout()}>Logout</div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
}
