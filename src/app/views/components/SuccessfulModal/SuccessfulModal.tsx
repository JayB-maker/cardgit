"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
// import CloseIcon from "../../assets/images/modal-close-icon.svg";
import SuccessfulIcon from "../../assets/images/successful-icon.svg";
import { ModalContainer } from "../Modal/ModalContainer";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "../Button/Button";

const SuccessfulModal = ({
  showModal,
  closeModal,
  subTitle,
  title,
  onClose,
  buttonTitle,
}: {
  showModal: boolean;
  title?: string;
  subTitle?: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
  onClose: any;
  buttonTitle?: string;
}) => {
  const router = useRouter();
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`w-full lg:w-[596px] relative right-0 h-auto min-h-[20vh] max-h-[90vh] z-50 flex flex-col items-center rounded-[16px] bg-white overflow-auto`}
      >
        <div className="flex gap-4 flex-col w-full top-0 left-0 px-[24px] py-[32px] lg:px-[24px] sticky bg-white z-50 border-b border-[#EAECF0] ">
          <div className="flex justify-between items-center relative w-full">
            {/* <p className="text-[18px] font-[700] leading-[28px] text-[#101828] "></p> */}
            {/* <img
              src="{CloseIcon}"
              alt="Close Icon"
              className="cursor-pointer absolute right-0 -top-[44px] lg:top-[unset] lg:relative"
              onClick={() => {
                onClose();
                closeModal(!showModal);
              }}
            /> */}
          </div>
          <div className="flex flex-col items-center gap-8">
            <Image src={SuccessfulIcon} alt="Successful Icon" className="" />
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-2xl text-black ">
                {title ? title : "Successful"}
              </p>
              <p className="text-base text-gray-dark text-center ">
                {subTitle ? subTitle : "Action successfully performed "}
              </p>
            </div>
            <PrimaryButton
              type="submit"
              title={buttonTitle ? buttonTitle : "Okay"}
              className="text-center lg:px-[14px] lg:py-[16px] w-full "
              onClick={() => {
                onClose();
                closeModal(!showModal);
              }}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SuccessfulModal;
