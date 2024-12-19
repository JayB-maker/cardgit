"use client";

import React, { useState } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import { PrimaryButton } from "../Button/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../lib/helpers/routes";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const updateQuery = () => {
    router.push("?pageQuery=otp-verification"); // Updates the query params
  };

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-2xl">Reset Password</h1>
        <p className="text-gray text-base">
          Forgot your password? No worries! Check your inbox for an email from
          us.{" "}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <form className=" flex flex-col w-full gap-6">
          <CustomInputField
            // id="email-address"
            extraLabel="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            required
            style=" "
            placeholder="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <div className="w-full mt-2">
            <PrimaryButton
              title={"Reset"}
              type="submit"
              className="w-full"
              onClick={updateQuery}
              disabled={!email}
            />
          </div>
          <p className="text-gray text-base text-center">
            Remember password?{" "}
            <span
              onClick={() => router.push(ROUTES.SIGNIN)}
              className="text-primaryBlue cursor-pointer "
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
