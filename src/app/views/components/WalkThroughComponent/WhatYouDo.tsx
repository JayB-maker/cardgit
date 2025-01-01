"use client"

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import CustomSelect from "../CustomHTMLElements/CustomSelect";
import WhatYouDoIcon from "../../assets/images/what-you-do-icon.svg";
import { PrimaryButton } from "../Button/Button";
import { useForm } from "react-hook-form";

const WhatYouDo = ({
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
  const {
    formState: { errors },
    control,
  } = useForm();

  // Handle state updates for text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setDetails({ ...details, [name]: checked });
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
  };

  // Handle form submission
  const onSubmit = (data: any) => {
    setSetupStep(setupStep + 1);
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-6">
        <p className="base text-right w-full text-primaryBlue">Step 2/4</p>
        <Image src={WhatYouDoIcon} alt="about-icon" />
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
          <CustomSelect
            extraLabel="Industry"
            name="industry"
            handleChange={(e, a) => handleChange(e, a)}
            defaultValue={details?.industry}
            options={options}
            control={control}
            className="w-full"
          />
          <CustomInputField
            type="text"
            extraLabel="Job Title"
            placeholder={"Enter Job Title"}
            name="jobTitle"
            // value={details.jobTitle}
            // errors={errors.jobTitle?.message}
            onChange={(e: any) => handleInputChange(e)}
            defaultValue={details?.jobTitle}
          />

          <CustomInputField
            type="text"
            extraLabel="Company"
            placeholder={"Enter Company"}
            name="company"
            // value={details.company}
            // errors={errors.company?.message}
            onChange={(e: any) => handleInputChange(e)}
            defaultValue={details?.company}
          />
          {/*  */}

          {/* <PrimaryButton
            title={"Next"}
            onClick={() => onSubmit(details)}
            // disabled={
            //   !details?.industry || !details?.company || !details?.jobTitle
            // }
          /> */}
        </div>
      </div>
    </div>
  );
};

export default WhatYouDo;
