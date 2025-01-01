"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CardgitLogo from "@/app/views/assets/images/desktop-logo.svg";
import MobileCardgitLogo from "@/app/views/assets/images/mobile-logo.svg";
import GoogleIcon from "@/app/views/assets/images/google-icon.svg";
import ShowPasswordIcon from "@/app/views/assets/images/eye-open.svg";
import HidePasswordIcon from "@/app/views/assets/images/eye-slash.svg";
import BubbleChatIcon from "@/app/views/assets/images/bubble-chat.svg";
import { PrimaryButton } from "@/app/views/components/Button/Button";
import { ROUTES } from "@/app/views/lib/helpers/routes";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { doSignIn } from "@/app/views/lib/actions/authenticationActions";
import CustomInputField from "@/app/views/components/CustomHTMLElements/CustomInputField";
import * as yup from "yup";
import { yupValidators } from "@/app/views/lib/helpers/yupValidators";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yupValidators.email,
  password: yupValidators.password,
});

const SignIn = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const togglePasswordField = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const [loginPayload, setLoginPayload] = useState<Login>({
    email: "",
    password: "",
  });

  const handleFormInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginPayload({ ...loginPayload, [name]: value });
  };

  const onSubmit = async () => {
    const isValidated = await trigger();

    if (isValidated) {
      setRequestLoader(true);

      const reqBody = {
        email: loginPayload?.email,
        password: loginPayload?.password,
        registration_type: "App",
        device_info: deviceInfo,
      };

      const res: any = await doSignIn(reqBody);

      if (res.status === "success") {
        setRequestLoader(false);
        toast.success(res?.message);
        router.push(ROUTES?.DASHBOARD);
        // Check for user status and navigate accordingly
      }
      if (res.status === "error") {
        setRequestLoader(false);
        toast.error(res?.message);
      }
    }
  };

  const loginAccount = async () => {
    setRequestLoader(true);
    const payload = { ...registerPayload, device_info: deviceInfo };
    const res: any = await doSignIn(payload);

    if (res.status === "success") {
      setRequestLoader(false);
      setRequestLogin(false);
      toast.success(res?.message);
      router.push(ROUTES?.DASHBOARD);
    }
    if (res.status === "error") {
      setRequestLoader(false);
      setRequestLogin(false);
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
      loginAccount();
    }
  }, [proceedToRegister]);

  return (
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
      <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-black text-2xl">Welcome to CardGit</h1>
          <p className="text-gray text-base">
            Create a new account with CardGit
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <button
            // onClick={() => signIn("google")}
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
          </form>
          {/* <div className="w-full mt-2">
            <PrimaryButton
              title={"Sign in"}
              type="submit"
              className="w-full"
              onClick={onSubmit}
              loader={requestLoader}
              disabled={requestLoader}
            />
          </div> */}
          <p className="text-gray text-base text-center">
            Forgot password?{" "}
            <span
              onClick={() => router.push(ROUTES.RESET_PASSWORD)}
              className="text-primaryBlue cursor-pointer "
            >
              Reset now
            </span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 lg:bottom-16 right-4 md:right-16 cursor-pointer w-fit px-4 py-2.5 bg-white rounded-full flex items-center gap-2 ">
        <Image src={BubbleChatIcon} alt="support-icon" />
        <p className="text-sm text-gray-dark">Contact Support</p>
      </div>
    </div>
  );
};

export default SignIn;
