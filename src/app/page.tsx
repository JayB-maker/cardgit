"use client";

import { useEffect, useState } from "react";
import CustomCheckboxInput from "./views/components/CustomHTMLElements/CustomCheckboxInput";
import CustomInputField from "./views/components/CustomHTMLElements/CustomInputField";
import CustomOtpInput from "./views/components/CustomHTMLElements/CustomOtpInput";
import CustomSelect from "./views/components/CustomHTMLElements/CustomSelect";

export default function Home() {
  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: "",
    platform: "",
    language: "",
  });

  useEffect(() => {
    const { userAgent, platform, language } = navigator;
    setDeviceInfo({ userAgent, platform, language });
  }, []);

  console.log(deviceInfo, 'dev')

  console.log(checked)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CustomInputField type="text" />
      <CustomCheckboxInput
        label="I agree to the terms and conditions"
        name="terms"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <CustomSelect name="custom" options={[]} />
      <CustomOtpInput onChange={console.log} value="" valueLength={4} />
    </div>
  );
}
