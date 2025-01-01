"use client";

import React, { useState } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import { PrimaryButton } from "../Button/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../lib/helpers/routes";
import { yupValidators } from "../../lib/helpers/yupValidators";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  doForgotPassword,
  doSignUp,
} from "../../lib/actions/authenticationActions";

type FormValues = {
  email: string;
};

type Registration = {
  email: string;
};

const schema = yup.object().shape({
  email: yupValidators.email,
});

const ResetPassword = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
  });
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [requestLoader, setRequestLoader] = useState(false);

  const updateQuery = (id: string) => {
    router.push(`?pageQuery=otp-verification&profile_id=${id}`); // Updates the query params
  };

  const [registration, setRegistrations] = useState<Registration>({
    email: "",
  });

  const handleFormInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrations({ ...registration, [name]: value });
  };

  const onSubmit = async () => {
    const isValidated = await trigger();

    if (isValidated) {
      setRequestLoader(true);

      const reqBody = {
        email: registration?.email,
      };

      const res: any = await doForgotPassword(reqBody);

      if (res.status === "success") {
        setRequestLoader(false);
        toast.success(res?.message);
        updateQuery(res?.data?.id);
      }
      if (res.status === "error") {
        setRequestLoader(false);
        toast.error(res?.message);
      }
    }
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
            extraLabel="Email Address"
            type="text"
            autoComplete="email"
            placeholder="Email address"
            errors={errors.email?.message}
            errorMessage={errors.email?.message}
            {...register("email", { required: true })}
            onChange={(e: any) => handleFormInputChange(e)}
          />
        </form>
        {/* <div className="w-full mt-2">
          <PrimaryButton
            title={"Reset"}
            type="submit"
            className="w-full"
            onClick={onSubmit}
            loader={requestLoader}
            disabled={requestLoader}
          />
        </div> */}
        <p className="text-gray text-base text-center">
          Remember password?{" "}
          <span
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="text-primaryBlue cursor-pointer "
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
