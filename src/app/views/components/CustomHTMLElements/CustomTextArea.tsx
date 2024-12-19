"use client";

import React from "react";
import { ChangeHandler } from "react-hook-form";
import { enforceMaxLength } from "../../lib/helpers/enforceMaxLength";

interface ICustomTextAreaProps {
  name?: string;
  placeholder?: string;
  label?: string;
  errors?: any;
  maxLength?: undefined | number;
  defaultValue?: string | number;
  value?: string | number;
  minLength?: undefined | number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: any;
  showRequiredIcon?: boolean;
  hasActionButton?: boolean;
  actionButtonText?: string;
  onClickActionButton?: () => void;
  extraLabel?: string;
  bottomLabel?: string;
  rows?: number;
  style?: string;
}

const CustomTextArea: React.FC<ICustomTextAreaProps> = React.forwardRef(
  (
    {
      name,
      placeholder,
      label,
      errors,
      maxLength,
      defaultValue,
      minLength,
      onChange,
      showRequiredIcon,
      extraLabel,
      bottomLabel,
      rows,
      style,
      readOnly,
      required,
      ...otherProps
    },
    ref: any
  ) => {
    return (
      <div className="">
        {label && (
          <div className="flex items-center mb-1">
            <label className="block text-incoverGray text-[14px] font-[400] leading-[20px]">
              {label}
            </label>
            {showRequiredIcon && <sup className="ml-1 text-[#EB5757]">*</sup>}
          </div>
        )}
        {extraLabel?.length ? (
          <h1 className="text-[#394753] text-[14px] lg:leading-[14px] font-[500] mb-1.5">
            {extraLabel}
          </h1>
        ) : null}
        <textarea
          className={`bg-white appearance-none border-[1px] px-4 placeholder:text-[#98A2B3] resize-none placeholder:text-[14px] placeholder:lg:leading-[20px] font-medium text-base placeholder:font-[400] focus:ring-0 ${
            readOnly ? "text-Gray bg-[#F5F5F5]" : "text-[#1D2939]"
          } ${
            errors ? "border-[#EB5757]" : "border-gray"
          }   rounded-[12px] w-full h-[88px] py-2  leading-[20px] text-[14px] font-[300] outline-none focus:outline-none focus:bg-white  ${
            errors ? "border-[#EB5757]" : "focus:border-primaryBlue"
          } ${style}`}
          name={name}
          placeholder={placeholder}
          onKeyPress={enforceMaxLength}
          maxLength={maxLength}
          minLength={minLength}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
          rows={rows || 3}
          ref={ref}
          {...otherProps}
        />
        {bottomLabel && bottomLabel.length && !errors && (
          <p className="text-[#6A7581] text-[12px] lg:leading-[16px] font-[100]">
            {bottomLabel}
          </p>
        )}
        {/* {errors && <ErrorHandler errors={errors} />} */}
      </div>
    );
  }
);
export default CustomTextArea;
