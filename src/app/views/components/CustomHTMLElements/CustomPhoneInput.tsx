"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ChevronDown from "../../assets/images/chevron-down.svg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface PhoneNumberInputProps {
  id?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  extraLabel?: string;
  onChange?: (val: string) => void;
  onInfoClick?: () => void;
}

interface CountryCode {
  name?: string;
  code?: string;
  flag?: string;
  format?: string;
  placeholder?: string;
}

export default function CustomPhoneInput({
  onChange,
  onInfoClick,
  defaultValue,
  required,
  extraLabel,
  ...props
}: PhoneNumberInputProps) {
  const supportedCountries = useMemo(
    () => [
      {
        name: "Canada",
        code: "+1",
        flag: "ca",
        format: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        placeholder: "123-456-7890",
      },
      {
        name: "Nigeria",
        code: "+234",
        flag: "ng",
        format: "[0-9]{3} [0-9]{3} [0-9]{4}",
        placeholder: "803-052-0715",
      },
    ],
    []
  );

  const [countryCode, setCountryCode] = useState<CountryCode>(
    supportedCountries[1]
  );
  const [phoneNumber, setPhoneNumber] = useState(""); // No longer initializing with defaultValue
  const [showDropDown, setShowDropDown] = useState(false);

  // Extract country code and phone number from defaultValue if present
  useEffect(() => {
    if (defaultValue) {
      const matchedCountry = supportedCountries.find((country) =>
        defaultValue.startsWith(country.code)
      );

      if (matchedCountry) {
        // Set the country code and remove it from the default phone number
        setCountryCode(matchedCountry);
        const strippedPhoneNumber = defaultValue.replace(
          matchedCountry.code,
          ""
        );
        setPhoneNumber(strippedPhoneNumber);
      } else {
        // If no matching country, just use the defaultValue as the phone number
        setPhoneNumber(defaultValue);
      }
    }
  }, [defaultValue, supportedCountries]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);

    // Call onChange prop with full phone number (country code + number)
    if (onChange) {
      onChange(`${countryCode?.code}${newPhoneNumber.replace(/[\s-]/g, "")}`);
    }
  };

  return (
    <div>
      {extraLabel ? (
        <div className="text-gray-dark text-sm mb-1.5">
          {extraLabel}
        </div>
      ) : null}
      <div className="flex items-center w-full gap-2">
        {/* Hidden input to store the full phone number */}
        <input
          type="hidden"
          readOnly
          value={`${countryCode?.code}${phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", "")}`}
          {...props}
        />

        {/* Button & Tag */}

        <Popover className="cursor-pointer relative">
          <>
            <PopoverButton
              className={`flex items-center py-4 px-4 text-sm font-medium text-center bg-gray-light text-gray-900  rounded-lg`}
            >
              <div className="flex flex-1 gap-2 items-center">
                <div className="w-5 h-5 rounded-full relative overflow-hidden">
                  <Image
                    src={`/images/flags/${countryCode?.flag}.svg`}
                    alt={""}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <Image src={ChevronDown} alt={""} />
              </div>
            </PopoverButton>

            <PopoverPanel className="absolute bg-white left-0 mt-2 z-50 w-[180px] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="">
                <div className="items-center grid gap-4 px-5 py-4 ">
                  {supportedCountries?.map((item, index) => (
                    <div
                      className="flex items-center gap-2"
                      key={index}
                      onClick={() => {
                        setCountryCode(item);
                        setShowDropDown(false);
                        
                      }}
                    >
                      <div className="w-5 h-5 rounded-full relative overflow-hidden">
                        <Image
                          src={`/images/flags/${item?.flag}.svg`}
                          alt={"flag"}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-dark">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </>
        </Popover>

        {/* Input */}
        <label
          htmlFor="phone-input"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Phone number:
        </label>

        <div className="relative flex-1">
          <input
            type="tel"
            className="block p-4 w-full z-20 text-sm text-black bg-[#F5F6F7] focus:outline-none focus:ring-0 outline-none border-none focus:border-black rounded-lg "
            pattern={countryCode?.format}
            placeholder={countryCode?.placeholder}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}
