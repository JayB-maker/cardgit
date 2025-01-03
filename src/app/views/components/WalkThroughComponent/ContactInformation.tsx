"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import ContactIcon from "../../assets/images/contact-icon.svg";
import { PrimaryButton } from "../Button/Button";
import CustomPhoneInput from "../CustomHTMLElements/CustomPhoneInput";

const ContactInformation = ({
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
    setSetupStep(setupStep + 1);
  };

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-6">
        <p className="base text-right w-full text-primaryBlue">Step 3/4</p>
        <Image src={ContactIcon} alt="about-icon" />
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-black text-2xl text-center">What do you do?</h1>
          <p className="text-gray text-base text-center">
            Tell us your job title and where you work
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div
          className=" flex flex-col w-full gap-6"
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <CustomPhoneInput extraLabel="Phone Number" />

          {/* <div className="grid items-center w-full grid-cols-1 md:grid-cols-2 gap-4">
            <OutlineButton
              title={"Skip"}
              onClick={() => setSetupStep(setupStep + 1)}
            />
            <PrimaryButton
              title={"Next"}
              onClick={() => onSubmit(details)}
            //   disabled={
            //     !details?.industry || !details?.company || !details?.jobTitle
            //   }
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
