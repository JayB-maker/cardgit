"use client";

import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../Button/Button";
import CustomOtpInput from "../CustomHTMLElements/CustomOtpInput";
import Countdown from "../Countdown/Countdown";
import { useRouter, useSearchParams } from "next/navigation";
import {
  resendCardgitCode,
  validateOTP,
} from "../../lib/actions/authenticationActions";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const [otpValue, setOtpValue] = useState<any>("");
  const [requestLoader, setRequestLoader] = useState(false);
  const trimmedOTP = otpValue?.trim();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("profile_id");

  useEffect(() => {
    if (localStorage.getItem("otp")) {
      const code: any = localStorage.getItem("otp") || "";
      setOtpValue(code);
    }
  }, []);

  // const onSubmit = () => {
  //   if (trimmedOTP?.length === 6) {
  //     localStorage.setItem("otp", trimmedOTP);
  //     router.push("?pageQuery=new-password");
  //   }
  // };

  const onSubmit = async () => {
    setRequestLoader(true);
    const reqBody: { profile_id: string; code: string } = {
      profile_id: id as string,
      code: otpValue,
    };

    const res: any = await validateOTP(reqBody);

    if (res.status === "success") {
      localStorage.setItem("otp", trimmedOTP);
      setRequestLoader(false);
      toast.success(res?.message);
      router.push("?pageQuery=new-password");
    }
    if (res.status === "error") {
      setRequestLoader(false);
      toast.error(res?.message);
    }
  };

  const handleResendOtp = async () => {
    setRequestLoader(true);
    const reqBody: { profile_id: string } = {
      profile_id: id as string,
    };
    const res: any = await resendCardgitCode(reqBody);
    if (res.status === "success") {
      setRequestLoader(false);
      toast.success(res?.message);
    }
    if (res.status === "error") {
      setRequestLoader(false);
      toast.error(res?.message);
    }
  };

  return (
    <div className="max-w-[596px] w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-2xl">Enter OTP Code</h1>
        <p className="text-gray text-base">
          Enter code sent to your email{" "}
          <span className="font-bold text-black">glory****.com</span>
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <form className=" flex flex-col items-center w-full gap-6">
          <CustomOtpInput
            onChange={setOtpValue}
            valueLength={6}
            value={otpValue}
          />
        </form>
        {/* <div className="w-full mt-2">
          <PrimaryButton
            title={"Proceed"}
            // type="submit"
            className="w-full"
            disabled={trimmedOTP?.length < 6}
            onClick={onSubmit}
          />
        </div> */}
        <Countdown initialTime={180} onResendOtp={handleResendOtp} />
      </div>
    </div>
  );
};

export default OTPVerification;
