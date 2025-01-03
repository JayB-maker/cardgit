"use client";

import React, { Dispatch, SetStateAction } from "react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";
import { PrimaryButton } from "../Button/Button";
import AboutIcon from "../../assets/images/about-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { yupValidators } from "../../lib/helpers/yupValidators";
import CustomSelect from "../CustomHTMLElements/CustomSelect";
import Image from "next/image";

// Yup Schema
const schema = yup.object().shape({
  firstName: yupValidators.firstName,
  email: yupValidators.email,
  role: yup.object({
    value: yup.string().required("Role is required"),
    label: yup.string(),
  }),
});

const AboutYou = ({
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
  // Initialize useForm
  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: details, // Sync with initial state
  });

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
        <p className="base text-right w-full text-primaryBlue">Step 1/4</p>
        <Image src={AboutIcon} alt="about-icon" />
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-black text-2xl text-center">
            Hi there! Let's get to know you better
          </h1>
          <p className="text-gray text-base text-center">
            Start by sharing your name and location with us
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <form
          className=" flex flex-col w-full gap-6"
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInputField
            type="text"
            extraLabel="Full Name"
            placeholder={"Enter full name"}
            name="fullName"
            // value={details.fullName}
            errors={errors.fullName?.message}
            onChange={(e: any) => handleInputChange(e)}
            defaultValue={details?.fullName}
          />
          <CustomSelect
            extraLabel="Country"
            name="country"
            handleChange={(e, a) => handleChange(e, a)}
            defaultValue={details?.country}
            options={options}
            control={control}
            className="w-full"
          />
          <CustomInputField
            type="text"
            extraLabel="City"
            placeholder={"Enter city"}
            name="city"
            // value={details.city}
            errors={errors.city?.message}
            onChange={(e: any) => handleInputChange(e)}
            defaultValue={details?.city}
          />
          {/*  */}

          <PrimaryButton
            title={"Next"}
            onClick={() => onSubmit(details)}
            disabled={!details?.fullName || !details?.country || !details?.city}
          />
        </form>
      </div>
    </div>
  );
};

export default AboutYou;
