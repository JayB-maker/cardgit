"use client"

import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import CameraIcon from "../../assets/images/camera-icon.svg";
import UploadIcon from "../../assets/images/upload-image-icon.svg";
import { OutlineButton, PrimaryButton } from "../Button/Button";
import { convertToBase64 } from "../../lib/helpers/convertToBase64";
import { toast } from "react-toastify";

const YourPhoto = ({
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
  const fileInputRef = useRef<any>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle form submission
  const onSubmit = (data: any) => {
    setSetupStep(setupStep + 1);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);

    // handleDroppedFiles(file);
  };

  const onFileChange = async ({ e }: { e: any }) => {
    const { target = {} } = e || {};
    const { name, files } = target;
    const fileName = files[0]?.name;
    const fileSize = files[0]?.size;

    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    // If picture size is greater than maxSize
    if (fileSize <= maxSize) {
      const fileBase64 = await convertToBase64(e.target.files[0]);
      const extension = fileName.split(".").pop();

      let newFile = {} as {
        fileName: string;
        extension: string;
        photo: string | any;
      };
      newFile = {
        fileName,
        extension,
        photo: fileBase64,
      };

      // setDetails({ ...details, [`photo${name}`]: newFile.photo });

      setDetails({
        ...details,
        eventPosterUrl: newFile,
        eventPosterUrlPhoto: newFile.photo,
      });
    }

    if (fileSize > maxSize) {
      // File exceeds the size limit
      toast.error("Please select a file that is smaller than 2MB.");
      return (e.target.value = null);
    }

    target.value = "";
  };

  const handleBrowseClick = (e: any) => {
    // e.preventDefault();
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-xl w-full shadow-sm bg-white px-6 py-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-6">
        <p className="base text-right w-full text-primaryBlue">Step 4/4</p>
        <Image src={CameraIcon} alt="about-icon" />
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-black text-2xl text-center">
            Finally, upload a photo of yourself
          </h1>
          <p className="text-gray text-base text-center">
            A professional photo creates a powerful first impression
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className=" flex flex-col w-full gap-6">
          <div
            //   role="button"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            className="flex flex-col space-y-2 items-center "
          >
            <div className="max-w-[310px] w-full rounded-lg py-14 bg-gray-light border border-dashed border-[#DFE2E7] p-2 flex flex-col items-center space-y-2">
              {details?.eventPosterUrl ? (
                <span className="" key="eventPosterUrl">
                  {/* {hideWord(details?.eventPosterUrl?.fileName)} */}
                  <Image
                    src={`${details?.eventPosterUrl?.photo}`}
                    alt=""
                    width={166}
                    height={100}
                    className="w-[166px] h-[100px] mt-2 object-contain"
                  />
                </span>
              ) : (
                <>
                  <div className="mx-auto relative">
                    <Image src={UploadIcon} alt="Upload image" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray text-sm">
                      Drop and drag your photo here
                    </p>
                    <p className="text-gray text-sm">
                      Max file size up to 2MB
                    </p>
                  </div>
                </>
              )}
            </div>
            <input
              accept="image/*"
              className="hidden"
              // name="eventPosterUrl"
              onChange={(e) => {
                onFileChange({
                  e,
                });
              }}
              type="file"
              ref={fileInputRef}
            />
          </div>

          <div className="grid items-center w-full grid-cols-1 md:grid-cols-2 gap-4">
            <OutlineButton
              title={"Skip"}
              onClick={() => setSetupStep(setupStep + 1)}
            />
            <PrimaryButton
              title={"Next"}
              onClick={() => onSubmit(details)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPhoto;
