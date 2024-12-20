"use client";

import React, { useEffect, useState } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import CustomCheckboxInput from "../CustomHTMLElements/CustomCheckboxInput";
import { PrimaryButton } from "../Button/Button";
import Image from "next/image";
// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../assets/images/google-icon.svg";
import ShowPasswordIcon from "../../assets/images/eye-open.svg";
import HidePasswordIcon from "../../assets/images/eye-slash.svg";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { doSignUp } from "../../lib/actions/authenticationActions";
import { Resolver, useForm } from "react-hook-form";
import { yupValidators } from "../../lib/helpers/yupValidators";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROUTES } from "../../lib/helpers/routes";

type FormValues = {
  email: string;
  confirm_password: string;
  // registration_type: string;
  password: string;
};

type Registration = {
  email: string;
  confirm_password: string;
  // registration_type: string;
  password: string;
};

const schema = yup.object().shape({
  email: yupValidators.email,
  password: yupValidators.password,
  confirm_password: yupValidators.password,
  // registration_type: yup.string().required("Invalid registration type"),
});

const Signup = ({ setEmail }: { setEmail: any }) => {
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
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const router = useRouter();
  const [registerPayload, setRegisterPayload] = useState<any>({
    email: "",
    registration_type: "",
    password: "",
  });
  const [proceedToRegister, setRegistration] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  const [requestLogin, setRequestLogin] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    user_agent: "",
    platform: "",
    language: "",
  });

  useEffect(() => {
    const { userAgent, platform, language } = navigator;
    setDeviceInfo({ user_agent: userAgent, platform, language });
  }, []);

  const updateQuery = (id: "string") => {
    router.push(`?pageQuery=verification&id=${id}`); // Updates the query params
  };

  const [registration, setRegistrations] = useState<Registration>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleFormInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrations({ ...registration, [name]: value });
  };

  const togglePasswordField = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  // console.log(errors.registration_type?.message, "regtype")
  const onSubmit = async () => {
    const isValidated = await trigger();

    if (isValidated) {
      setRequestLoader(true);

      const reqBody = {
        email: registration?.email,
        password: registration?.password,
        confirm_password: registration?.confirm_password,
        registration_type: "App",
        device_info: deviceInfo,
      };

      const res: any = await doSignUp(reqBody);

      if (res.status === "success") {
        console.log(res, "res");
        setRequestLoader(false);
        toast.success(res?.message);
        updateQuery(res?.data?.id);
      }
      if (res.status === "error") {
        console.log(res);
        setRequestLoader(false);
        toast.error(res?.message);
      }
    }
  };

  const registerAccount = async () => {
    setRequestLoader(true);
    const payload = { ...registerPayload, device_info: deviceInfo };
    const res: any = await doSignUp(payload);

    if (res.status === "success") {
      console.log(res, "res");
      setRequestLoader(false);
      toast.success(res?.message);
      router.push(ROUTES.SIGNIN);
    }
    if (res.status === "error") {
      console.log(res);
      setRequestLoader(false);
      toast.error(res?.message);
    }
  };

  const LoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo: any = await new Promise((resolve) => {
          const xhrRequest = new XMLHttpRequest();

          xhrRequest.open(
            "GET",
            `https://www.googleapis.com/oauth2/v3/userinfo`
          );
          xhrRequest.setRequestHeader(
            "Authorization",
            `Bearer ${tokenResponse.access_token}`
          );
          xhrRequest.onload = function () {
            if (this.status >= 200 && this.status < 300)
              resolve(JSON.parse(this.responseText));
            else resolve({ err: "404" });
          };
          xhrRequest.send();
        });
        setRegisterPayload({
          registration_type: "Google",
          email: userInfo?.email,
        });
        setRegistration(true);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (proceedToRegister) {
      registerAccount();
    }
  }, [proceedToRegister]);

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-2xl">Welcome to CardGit</h1>
        <p className="text-gray text-base">Create a new account with CardGit</p>
      </div>
      <div className="flex flex-col gap-6">
        <button
          onClick={() => LoginWithGoogle()}
          className="group relative w-full flex items-center gap-2 justify-center py-2 px-4 border border-transparent text-sm rounded-md text-gray-dark bg-gray-light hover:opacity-85 focus:outline-none focus:ring-none "
        >
          <Image src={GoogleIcon} alt="google-icon" />
          Sign in with Google
        </button>
        <div className="flex items-center w-full gap-2">
          <hr className="w-full bg-gray-light" />
          <p className="text-gray-dark text-sm">Or</p>
          <hr className="w-full bg-gray-light" />
        </div>
        <form className=" flex flex-col w-full gap-6">
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}
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
          <CustomInputField
            type={passwordType}
            extraLabel="Password"
            autoComplete="current-password"
            required
            placeholder="Enter password"
            value={password}
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
            value={verifyPassword}
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

          <CustomCheckboxInput
            extraLabel={
              <p className="text-gray-dark text-sm">
                I agree to the{" "}
                <span className="text-gray-darker cursor-pointer">
                  Terms and Conditions
                </span>{" "}
                and{" "}
                <span className="text-gray-darker cursor-pointer">
                  Acceptable Use Policy
                </span>
              </p>
            }
          />
        </form>
        <div className="w-full mt-2">
          <PrimaryButton
            title={"Sign up"}
            type="submit"
            className="w-full"
            onClick={onSubmit}
            loader={requestLoader}
            disabled={requestLoader}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
