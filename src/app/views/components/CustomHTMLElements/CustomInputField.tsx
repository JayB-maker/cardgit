/* eslint-disable react/display-name */

"use client";

import React from "react";
import { ChangeHandler } from "react-hook-form";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { Controller } from "react-hook-form";
import { DebounceInput } from "react-debounce-input";
import { enforceMaxLength } from "../../lib/helpers/enforceMaxLength";

interface ICustomInputFieldProps {
  type: string;
  name?: string;
  label?: string;
  errors?: any;
  maxLength?: undefined | number;
  max?: number | string | any;
  defaultValue?: string | number;
  value?: string | number;
  minLength?: undefined | number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: any;
  onKeyUpPress?: any;
  onKeyDownPress?: any;
  min?: number | string | any;
  showRequiredIcon?: boolean;
  passwordError?: boolean;
  hasActionButton?: boolean;
  removeBottomBorder?: boolean;
  autoComplete?: string;
  actionButtonText?: any;
  onClickActionButton?: () => void;
  onClickIcon?: () => void;
  extraLabel?: any;
  hasIcon?: number | any;
  addPadding?: boolean;
  children?: React.ReactNode | undefined;
  errorMessage?: string;
  style?: string;
  placeholder?: any;
  originalWidth?: boolean;
  debounce?: boolean;
}

const CustomInputField: React.FC<ICustomInputFieldProps> = React.forwardRef(
  (
    {
      extraLabel,
      min,
      required,
      removeBottomBorder,
      showRequiredIcon,
      hasActionButton,
      actionButtonText,
      onClickActionButton,
      type,
      name,
      label,
      errors,
      maxLength,
      max,
      defaultValue,
      value,
      minLength,
      readOnly,
      onChange,
      onKeyUpPress,
      onKeyDownPress,
      children,
      hasIcon,
      addPadding,
      onClickIcon,
      passwordError,
      autoComplete,
      errorMessage,
      style,
      placeholder,
      originalWidth,
      debounce,
      ...otherProps
    },
    ref: any
  ) => {
    return (
      <div className={`${originalWidth ? "" : "w-full"}`}>
        {extraLabel ? (
          <div className="text-gray-dark text-sm mb-1">{extraLabel}</div>
        ) : null}
        <div className="relative">
          {children && (
            <div className="absolute flex items-center ml-2 h-full">
              <span>{children}</span>
            </div>
          )}
          {hasIcon && (
            <div
              className={`absolute inset-y-0 left-0 px-[14px] flex items-center text-sm text-Gray font-[300] leading-5 cursor-pointer`}
              onClick={onClickIcon}
            >
              <span className="text-capitalize">{hasIcon}</span>
            </div>
          )}
          {debounce ? (
            <DebounceInput
              className={`block appearance-none border bg-gray-light focus:ring-0 leading-5 text-sm peer focus:outline-none placeholder:text-gray-dark ${
                addPadding ? "pl-10" : ""
              } ${
                readOnly
                  ? "text-black focus:border-gray"
                  : "text-black focus:border-black"
              } ${
                errors
                  ? "border-error focus:border-error"
                  : "border-gray-light focus:border-black"
              }   rounded-[8px] w-full py-4 ${
                hasIcon ? "pl-7 pr-4" : "px-4"
              } ${errors && "border-error"} ${hasActionButton && ""} ${
                children && "border-l-0"
              } ${style} `}
              type={type}
              name={name}
              max={max}
              min={min}
              onKeyPress={enforceMaxLength}
              maxLength={maxLength}
              required={required}
              minLength={minLength}
              defaultValue={defaultValue}
              // value={defaultValue}
              onChange={onChange}
              onKeyUp={onKeyUpPress}
              onKeyDown={onKeyDownPress}
              readOnly={readOnly}
              autoComplete={autoComplete}
              ref={ref}
              {...otherProps}
              placeholder={placeholder ? placeholder : " "}
              id={label}
              debounceTimeout={2000}
            />
          ) : (
            <input
              className={`block appearance-none border bg-gray-light focus:ring-0 leading-5 text-sm peer focus:outline-none placeholder:text-gray-dark ${
                addPadding ? "pl-10" : ""
              } ${
                readOnly
                  ? "text-black focus:border-gray"
                  : "text-black focus:border-black"
              } ${
                errors
                  ? "border-error focus:border-error"
                  : "border-gray-light focus:border-black"
              }   rounded-[8px] w-full py-4 ${
                hasIcon ? "pl-7 pr-4" : "px-4"
              } ${errors && "border-error"} ${hasActionButton && ""} ${
                children && "border-l-0"
              } ${style} `}
              type={type}
              name={name}
              max={max}
              min={min}
              onKeyPress={enforceMaxLength}
              maxLength={maxLength}
              required={required}
              minLength={minLength}
              defaultValue={defaultValue}
              // value={defaultValue}
              onChange={onChange}
              onKeyUp={onKeyUpPress}
              onKeyDown={onKeyDownPress}
              readOnly={readOnly}
              autoComplete={autoComplete}
              ref={ref}
              {...otherProps}
              placeholder={placeholder ? placeholder : " "}
              id={label}
            />
          )}

          <label
            className={`absolute text-[11px] lg:text-[14px] leading-4  text-[#4D5154] dark:text-[#4D5154] duration-300 transform -translate-y-4 scale-75 px-1 top-2 origin-[0] bg-white dark:bg-white peer-focus:px-1  ${
              errors
                ? "peer-focus:text-error peer-focus:dark:text-error"
                : "peer-focus:text-primaryBlue peer-focus:dark:text-primaryBlue"
            }  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 ${
              hasIcon && "left-5"
            }`}
            htmlFor={label}
          >
            {label}
          </label>
          {hasActionButton && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={onClickActionButton}
            >
              <span className="text-capitalize">{actionButtonText}</span>
            </div>
          )}
        </div>
        {errors && (
          <div className="text-left">
            <ErrorHandler errors={errors} />
          </div>
        )}
      </div>
    );
  }
);

export default CustomInputField;
