import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import SuccessIcon from "../../assets/images/green-success-icon.svg";
import { OutlineButton, PrimaryButton } from "../Button/Button";
import { convertToBase64 } from "../../lib/helpers/convertToBase64";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../lib/helpers/routes";

const Successful = ({
  setSetupStep,
  setupStep,
  setDetails,
  details,
}: {
  setSetupStep: Dispatch<SetStateAction<number>>;
  setDetails: Dispatch<SetStateAction<any>>;
  setupStep: number;
  details: any;
}) => {
  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    console.log("Details State:", details);
    setSetupStep(setupStep + 1);
  };

  const router = useRouter();

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-6">
        <Image src={SuccessIcon} alt="about-icon" />
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-black text-2xl text-center">
            Your details are saved!
          </h1>
          <p className="text-gray text-base text-center">
            You can edit your digital business card anytime from your dashboard.
            Get ready to make connections effortlessly.
          </p>
        </div>
      </div>
      <PrimaryButton
        title={"Go to Dashboard"}
        onClick={() => router.push(ROUTES.DASHBOARD)}
      />
    </div>
  );
};

export default Successful;
