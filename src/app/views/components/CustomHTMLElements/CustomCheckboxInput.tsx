"use client";

import React, { useState } from "react";

const CustomCheckboxInput = ({
  label,
  name,
  checked,
  onChange,
  extraLabel,
}: {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: any;
  extraLabel?: any;
}) => {
  return (
    <label
      className={`flex space-x-4 cursor-pointer ${
        extraLabel ? "items-start" : "items-center"
      }`}
    >
      <div className="relative">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 h-0 w-0"
        />

        {/* Custom Checkbox */}
        <div
          className={`w-5 h-5 border-[2px] rounded-[4px] flex items-center justify-center transition-colors ${
            checked
              ? "bg-blue-900 border-primaryBlue"
              : "bg-white border-[#D0D5DD]"
          }`}
        >
          {/* Checkmark (optional) */}
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      {/* Label (optional) */}
      {label && (
        <span className="text-[14px] leading-5 font-[500] text-[#475467] ">
          {label}
        </span>
      )}
      {extraLabel && <div className="">{extraLabel}</div>}
    </label>
  );
};

export default CustomCheckboxInput;
