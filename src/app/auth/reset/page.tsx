"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import CardgitLogo from "@/app/views/assets/images/desktop-logo.svg";
import MobileCardgitLogo from "@/app/views/assets/images/mobile-logo.svg";
import BubbleChatIcon from "@/app/views/assets/images/bubble-chat.svg";
import { ROUTES } from "@/app/views/lib/helpers/routes";
import OTPVerification from "@/app/views/components/ResetPasswordComponent/OTPVerification";
import ResetPassword from "@/app/views/components/ResetPasswordComponent/ResetPassword";
import SuccessfulModal from "@/app/views/components/SuccessfulModal/SuccessfulModal";
import NewPassword from "@/app/views/components/ResetPasswordComponent/NewPassword";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("pageQuery") || "";

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col items-center gap-8 md:gap-16 bg-gray-light py-5 px-4 lg:px-6">
        <div className="w-full flex items-center justify-between">
          <Image
            src={CardgitLogo}
            alt="cardgit-logo"
            className="hidden lg:block"
          />
          <Image
            src={MobileCardgitLogo}
            alt="cardgit-logo"
            className="lg:hidden"
          />
          <div className="w-fit px-4 py-2.5 bg-white rounded-full">
            <p className="text-sm text-gray-dark">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push(ROUTES.SIGNUP)}
                className="text-primaryBlue cursor-pointer "
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
        {pageQuery === "otp-verification" ? (
          <OTPVerification />
        ) : pageQuery === "new-password" ? (
          <NewPassword />
        ) : (
          <ResetPassword />
        )}
        <div className="absolute bottom-4 lg:bottom-16 right-4 md:right-16 cursor-pointer w-fit px-4 py-2.5 bg-white rounded-full flex items-center gap-2 ">
          <Image src={BubbleChatIcon} alt="support-icon" />
          <p className="text-sm text-gray-dark">Contact Support</p>
        </div>
      </div>
      {false && (
        <SuccessfulModal
          buttonTitle="Back to Login"
          subTitle="You can now log in with your new password."
          title="You've successfully changed your password"
          closeModal={() => console.log("first")}
          onClose={() => router.push(ROUTES.SIGNIN)}
          showModal
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
