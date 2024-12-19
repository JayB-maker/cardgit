import React, { JSX, useState } from "react";
import Image from "next/image";
import CallIcon from "../../assets/images/call-icon.svg";
import NextIcon from "../../assets/images/arrow-right-icon.svg";
import MenuIcon from "../../assets/images/menu-icon.svg";
import BuyButtonIcon from "../../assets/images/buy-button-icon.svg";
import Link from "next/link";
import Logo from "../../assets/images/logo.svg";
import AvatarIcon from "../../assets/images/avatar.png";
import ChevronDown from "../../assets/images/chevron-down.svg";
import { useRouter } from "next/router";
import FileAClaim from '../../assets/images/file-a-claim.svg'
import { ROUTES } from "../../lib/helpers/routes";
// import { Link } from "@mui/material";

export default function Header({
  user,
  pageTitle,
  pageSubTitle,
  buyButton,
  claimAction,
  claimButton,
  setSideBar,
  titlePath,
}: // subTitlePath
{
  user: any;
  claimAction?: any;
  pageTitle: string;
  pageSubTitle?: string;
  titlePath: string;
  // subTitlePath: string;
  buyButton?: boolean;
  claimButton?: boolean;
  setSideBar?: any;
}): JSX.Element {
  const [buyInsurance, setBuyInsurance] = useState(false);
  const handleSidebar = () => {
    setSideBar(true);
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push(ROUTES.SIGNIN);
  };

  return (
    <>
      <header className="pt-5 pb-6 px-4 lg:px-8 flex items-center justify-between border-b-[0.4px] bg-white border-[#C8CCD0] border-opacity-30 sticky top-0 right-0 z-[5]">
        <div className="flex items-center">
          <Image
            src={MenuIcon}
            alt="menu-icon"
            className="xlg:hidden cursor-pointer mr-2"
            onClick={handleSidebar}
          />
          <Image
            src={Logo}
            alt="logo-icon"
            className="xlg:hidden cursor-pointer w-[67px] md:w-unset "
            onClick={handleSidebar}
          />
          <Link
            href={titlePath}
            className="hidden xlg:flex text-[18px] leading-[28px] font-[500] text-[#4D5154] capitalize"
          >
            {pageTitle}
          </Link>
          {pageSubTitle && (
            <>
              <Image src={NextIcon} alt="" className="hidden xlg:flex" />
              <h1 className="hidden xlg:flex text-[14px] leading-[20px] font-normal text-[#4D5154] capitalize">
                {pageSubTitle}
              </h1>
            </>
          )}
        </div>
        <div className="flex items-center md:hidden cursor-pointer gap-1">
          <div className="w-7 h-7 rounded-[50%] overflow-hidden ">
            <Image
              src={AvatarIcon}
              alt="avatar-icon"
              className="xlg:hidden cursor-pointer w-full"
            />
          </div>
          <Image
            src={ChevronDown}
            alt="chevron-icon"
            className="xlg:hidden cursor-pointer "
          />
        </div>
        {buyButton ? (
          <div
            className="hidden md:flex gap-2 items-center bg-primaryBlue rounded-[8px] cursor-pointer p-3"
            onClick={() => setBuyInsurance(true)}
          >
            <Image src={BuyButtonIcon} alt="buy-button" />
            <p className="text-[12px] leading-[16px] font-[500] text-[#ffffff] ">
              Buy new policy
            </p>
          </div>
        ) : claimButton ? (
          <div
            className="hidden md:flex gap-2 items-center bg-primaryBlue rounded-[8px] cursor-pointer p-3"
            onClick={() => claimAction(true)}
          >
            <Image src={FileAClaim} alt="buy-button" />
            <p className="text-[12px] leading-[16px] font-[500] text-[#ffffff] ">
              File a Claim
            </p>
          </div>
        ) : (
          <div className="hidden md:flex">
            <Image src={CallIcon} alt="" />
            <Link
              href="/contact"
              className="pl-3 font-[500] text-primaryBlue no-underline"
              target="_blank"
              style={{ color: "#006C33" }}
            >
              Ask for help
            </Link>
            {/* <p className="pl-3 font-semibold text-primaryBlue">Ask for help</p> */}
          </div>
        )}
      </header>
    </>
  );
}
