"use client";

import React, { useEffect, useState } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import { PrimaryButton } from "../Button/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../lib/helpers/routes";
import { yupValidators } from "../../lib/helpers/yupValidators";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import ShowPasswordIcon from "../../assets/images/eye-open.svg";
import HidePasswordIcon from "../../assets/images/eye-slash.svg";
import { doResetPassword } from "../../lib/actions/authenticationActions";
import Image from "next/image";

type FormValues = {
  confirm_password: string;
  password: string;
};

type Registration = {
  confirm_password: string;
  password: string;
};

const schema = yup.object().shape({
  password: yupValidators.password,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const NewPassword = () => {
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
  const [passwordType, setPasswordType] = useState("password");
  const [code, setCode] = useState("");
  const router = useRouter();
  const [requestLoader, setRequestLoader] = useState(false);

  const updateQuery = () => {
    router.push(ROUTES.SIGNIN); // Updates the query params
  };

  useEffect(() => {
    if (!localStorage.getItem("otp")) {
      router.push(ROUTES.RESET_PASSWORD);
    } else {
      const code: any = localStorage.getItem("otp");
      setCode(code);
    }
  }, []);

  const [resetPayload, setResetPayload] = useState<any>({
    registration_type: "",
    password: "",
  });

  const handleFormInputChange = (e: any) => {
    const { name, value } = e.target;
    setResetPayload({ ...resetPayload, [name]: value });
  };

  const togglePasswordField = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const onSubmit = async () => {
    const isValidated = await trigger();

    if (isValidated) {
      setRequestLoader(true);

      const reqBody: any = {
        code: code,
        password: resetPayload?.password,
        confirm_password: resetPayload?.confirm_password,
      };

      const res: any = await doResetPassword(reqBody);

      if (res.status === "success") {
        setRequestLoader(false);
        localStorage.removeItem("otp");
        toast.success(res?.message);
        updateQuery();
      }
      if (res.status === "error") {
        setRequestLoader(false);
        localStorage.removeItem("otp");
        toast.error(res?.message);
      }
    }
  };

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-2xl">New Password</h1>
        <p className="text-gray text-base">Enter and confirm new password</p>
      </div>
      <div className="flex flex-col gap-6">
        <form className=" flex flex-col w-full gap-6">
          <CustomInputField
            type={passwordType}
            extraLabel="Password"
            autoComplete="current-password"
            required
            placeholder="Enter password"
            errors={errors.password?.message}
            errorMessage={errors.password?.message}
            {...register("password", { required: true })}
            onChange={(e: any) => handleFormInputChange(e)}
            hasActionButton={true}
            actionButtonText={
              passwordType === "password" ? (
                <Image src={ShowPasswordIcon} alt="" />
              ) : (
                <Image src={HidePasswordIcon} alt="" />
              )
            }
            onClickActionButton={togglePasswordField}
          />
          <CustomInputField
            type={passwordType}
            extraLabel="Verify Password"
            autoComplete="current-password"
            required
            placeholder="Verify password"
            errors={errors.confirm_password?.message}
            errorMessage={errors.confirm_password?.message}
            {...register("confirm_password", { required: true })}
            onChange={(e: any) => handleFormInputChange(e)}
            hasActionButton={true}
            actionButtonText={
              passwordType === "password" ? (
                <Image src={ShowPasswordIcon} alt="" />
              ) : (
                <Image src={HidePasswordIcon} alt="" />
              )
            }
            onClickActionButton={togglePasswordField}
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

export default NewPassword;
