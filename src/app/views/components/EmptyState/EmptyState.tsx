import Image from "next/image";
import React from "react";
import card from "../../assets/images/empty-state-icon.svg";
import { PrimaryButton } from "../Button/Button";

export default function EmptyState({
  cardIcon,
  cardTitle,
  cardSubTitle,
  buttonTitle,
  onButtonClick,
}: {
  cardIcon?: string;
  cardTitle: string;
  cardSubTitle: string;
  buttonTitle: string;
  onButtonClick: any;
}) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Image src={cardIcon ? cardIcon : card} alt="" className="self-center" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[24px] leading-[24px] font-[600] text-center">
          {cardTitle}
        </h1>
        <p className="text-[16px] leading-[16px] font-[400] text-center">
          {cardSubTitle}
        </p>
      </div>
      <PrimaryButton
        title={buttonTitle}
        onClick={onButtonClick}
        className="mt-2 w-fit "
      />
    </div>
  );
}
