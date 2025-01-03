"use client";

import React, { useState } from "react";
import { PrimaryButton } from "../Button/Button";
import CustomOtpInput from "../CustomHTMLElements/CustomOtpInput";
import Countdown from "../Countdown/Countdown";
import { useRouter, useSearchParams } from "next/navigation";
import {
  activateAccount,
  resendCode,
} from "../../lib/actions/authenticationActions";
import { toast } from "react-toastify";
import { ROUTES } from "../../lib/helpers/routes";

const Verification = ({ email }: { email: string }) => {
  const [otpValue, setOtpValue] = useState<any>("");
  const trimmedOTP = otpValue?.trim();
  const [requestLoader, setRequestLoader] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleResendOtp = async () => {
    // setRequestLoader(true);
    const reqBody: { profile_id: string } = {
      profile_id: id as string,
    };

    const res: any = await resendCode(reqBody);

    if (res.status === "success") {
      // setRequestLoader(false);
      toast.success(res?.message);
      // router?.push(ROUTES?.SIGNIN);
    }
    if (res.status === "error") {
      setRequestLoader(false);
      toast.error(res?.message);
    }
  };

  const onSubmit = async () => {
    setRequestLoader(true);
    const reqBody: { id: string; code: string } = {
      id: id as string,
      code: otpValue,
    };

    const res: any = await activateAccount(reqBody);

    if (res.status === "success") {
      setRequestLoader(false);
      toast.success(res?.message);
      router?.push(ROUTES?.SIGNIN);
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
          <span className="font-bold text-black">{email}</span>
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
        <div className="w-full mt-2">
          <PrimaryButton
            title={"Verify Code"}
            type="submit"
            className="w-full"
            disabled={trimmedOTP?.length < 6}
            onClick={onSubmit}
          />
        </div>
        <Countdown initialTime={180} onResendOtp={handleResendOtp} />
      </div>
    </div>
  );
};

export default Verification;
