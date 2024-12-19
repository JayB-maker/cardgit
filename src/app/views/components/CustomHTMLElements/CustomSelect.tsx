"use client";

import React, { FC, ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { components, StylesConfig } from "react-select";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const customStyles: StylesConfig = {
  control: (base: Record<string, unknown>, state: any) => ({
    ...base,
    "*": {
      boxShadow: "none !important",
      margin: "0",
      padding: "0",
    },
    fontSize: "14px",
    borderRadius: "8px",
    height: "auto",
    minHeight: "54px",
    alignItems: "center",
    width: "auto",
    boxShadow: "none",
    margin: "0",
    paddingRight: "14px",
    paddingLeft: "14px",
    appearance: "none",
    background:"#F5F6F7",
    borderColor: state.isFocused ? "#000000" : "#F5F6F7",
    "&:hover": {
      borderColor: "#F5F6F7",
    },
    
  }),
  input: (base: any, state: any) => ({
    ...base,
    fontSize: "14px",
    margin: "0",
    paddingRight:
      state.hasValue || state.selectProps.inputValue ? "14px" : "14px",
    paddingLeft:
      state.hasValue || state.selectProps.inputValue ? "14px" : "14px",
    border: "#F5F6F7",
    fontWeight:"400"
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#343955",
    fontWeight: "500",
    fontSize: "14px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    display: state.hasValue || state.selectProps.inputValue ? "none" : "block",
    color: "#727A86",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#F9FAFB" : "#FFFFFF",
      color: isSelected ? "#475467" : "#475467",
      cursor: isDisabled ? "not-allowed" : styles.cursor,
      fontSize: "14px",
      fontWeight: "500",
      "&:hover": {
        backgroundColor: "#F9FAFB",
        color: "#475467",
      },
    };
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#F2F4F7",
    borderRadius: "99px",
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",

    gap: "8px",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#000000",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "#666",
    cursor: "pointer",
    padding: "1px",
    borderRadius: "4px",
    "&:hover": {
      color: "white",
      background: "black",
    },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
};

type SingleValue = {
  value: string | number;
  label: string;
};

type OptionModel = SingleValue[];

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const CustomSelect: FC<{
  options: OptionModel;
  handleChange?: ((newValue: any, newAction: any) => void) | undefined;
  defaultValue?: any;
  inputValue?: any;
  components?: any;
  isDisabled?: boolean;
  talent?: boolean;
  placeholder?: string;
  containerClass?: any;
  className?: string;
  name: string;
  control?: any;
  errors?: any;
  isMulti?: boolean;
  extraLabel?: any;
}> = ({
  options,
  isDisabled,
  placeholder,
  containerClass,
  className,
  name,
  control,
  errors,
  defaultValue,
  inputValue,
  handleChange,
  isMulti = false,
  extraLabel,
  talent,
}) => {
  const { control: componentControl } = useForm();
  return (
    <div className={` flex flex-col justify-start  ${containerClass}`}>
      {extraLabel && (
        <h1 className="text-[#344054] text-[14px] lg:leading-[14px] font-[500] mb-1.5">
          {extraLabel}{" "}
        </h1>
      )}

      <Controller
        name={name}
        control={control ? control : componentControl}
        defaultValue={defaultValue}
        render={({ field }) => {
          const { onChange, value, name } = field;
          return (
            <Select
              placeholder={placeholder}
              classNamePrefix={talent ? "react-select-talent" : "react-select"}
              className={`react-select-container ${className}`}
              options={options}
              onChange={(newValue: any) => {
                onChange(!isMulti ? newValue?.value : newValue);
                if (handleChange) {
                  handleChange(newValue, name);
                }
              }}
              isDisabled={isDisabled}
              value={options?.find((c) => c.value === defaultValue)}
              isClearable
              styles={customStyles}
              components={{
                ...components,
                IndicatorSeparator: () => null,
                ValueContainer: CustomValueContainer,
              }}
              isMulti={isMulti}
            />
          );
        }}
      />
      {errors && (
        <div className="text-left ml-3">
          <ErrorHandler errors={errors} />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
