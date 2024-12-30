import Link from "next/link";
import Lottie from "react-lottie-player";
import Spinner from "../../assets/json/spinner-white.json";
import Image from "next/image";
import Loader from "../Loader/loader";
const style = { height: "30px", width: "30px" };
interface ButtonProps {
  title: any;
  onClick?: () => any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loader?: any;
  id?: any;
  afterIcon?: any;
  beforeIcon?: any;
}

interface LinkProps {
  title: any;
  url: string;
  className?: string;
}

export const PrimaryButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  loader,
  afterIcon,
  beforeIcon,
  id,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      id={id}
      className={`${
        (loader || beforeIcon || afterIcon) &&
        "flex justify-center items-center"
      } text-white bg-primaryBlue hover:bg-primaryBlue-hover  disabled:bg-gray-light py-[10px] lg:py-[16px] px-4 lg:px-4 text-sm rounded-lg focus:outline-none whitespace-nowrap ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-4">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-4">
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="ml-4">
          <Loader />
        </span>
      )}
    </button>
  );
};

export const CardgitButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  loader,
  afterIcon,
  beforeIcon,
  id,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      id={id}
      className={`${
        (loader || beforeIcon || afterIcon) &&
        "flex justify-center items-center"
      } bg-primaryBlue disabled:bg-gray-light text-white lg:flex lg:py-2.5 lg:px-4 lg:rounded-[12px] hover:bg-primaryBlue-hover py-[10px]  px-[16px] text-[14px] lg:text-[14px] font-[700] rounded-[12px] focus:outline-none whitespace-nowrap text-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-2">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-2">
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="ml-2">
          <Loader />
        </span>
      )}
    </button>
  );
};

export const OutlinePurpleButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  afterIcon,
  beforeIcon,
  loader,
  ...rest
}: ButtonProps) => {
  const style = { height: "24px", width: "24px" };
  return (
    <button
      type={type}
      className={`${
        (beforeIcon || afterIcon) && "flex items-center"
      } hidden border-[1px] border-primaryBlue text-primaryBlue lg:flex lg:py-[9px] px-4 rounded-[12px]   bg-transparent hover:bg-primaryBlue-hover disabled:text-[#C8CCD0] py-[10px] text-[14px] lg:text-[14px] font-[700] text-center justify-center focus:outline-none whitespace-nowrap  ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-2">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-2">
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="ml-2">
          <Lottie animationData={Spinner} style={style} play />
        </span>
      )}
    </button>
  );
};

export const OutlineBlackButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  afterIcon,
  beforeIcon,
  loader,
  ...rest
}: ButtonProps) => {
  const style = { height: "24px", width: "24px" };
  return (
    <button
      type={type}
      className={`${
        (beforeIcon || afterIcon) && "flex items-center"
      } hidden border-[1px] border-[#D0D5DD] text-[#344054] lg:flex lg:py-[9px] px-4 rounded-[12px]   bg-transparent hover:bg-primaryBlue-hover disabled:text-[#C8CCD0] py-[10px] text-[14px] lg:text-[14px] font-[700] focus:outline-none whitespace-nowrap  ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-2">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-2">
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="ml-2">
          <Lottie animationData={Spinner} style={style} play />
        </span>
      )}
    </button>
  );
};

export const OutlineButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  afterIcon,
  beforeIcon,
  loader,
  ...rest
}: ButtonProps) => {
  const style = { height: "24px", width: "24px" };
  return (
    <button
      type={type}
      className={`${
        (beforeIcon || afterIcon) && "flex gap-2 items-center"
      } text-gray-dark bg-gray-light hover:opacity-90 disabled:text-[#C8CCD0] py-[10px] px-[16px] text-sm rounded-lg focus:outline-none whitespace-nowrap ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="w-[20px]">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span>
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="">
          <Lottie animationData={Spinner} style={style} play />
        </span>
      )}
    </button>
  );
};

export const OtherButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  loader,
  afterIcon,
  beforeIcon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${(loader || beforeIcon || afterIcon) && "flex  items-center"}
       border-[1px] rounded-[4px] focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-2">
          <Image src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-2">
          <Image src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="">
          <Lottie animationData={Spinner} style={style} play />
        </span>
      )}
    </button>
  );
};

export const PrimaryLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <Link href={url}>
      <div
        className={`text-white bg-primaryBlue hover:bg-primaryBlue-hover hover:border-[#004822] disabled:bg-[#C8CCD0] disabled:border-[#C8CCD0] border-primaryBlue border-[1px] py-4 px-6 text-[1.05rem] font-[300] rounded-[5px] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </Link>
  );
};

export const OutlineLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <Link href={url}>
      <div
        className={`text-primaryBlue text-center bg-white border-primaryBlue hover:border-[#004822] hover:text-[#004822] disabled:border-[#C8CCD0] border-[1px] py-4 px-6 text-[1.05rem] font-[400] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </Link>
  );
};

export const OtherLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <Link href={url}>
      <div
        className={`border-[1px] text-[1.05rem] font-[300] rounded-[5px] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </Link>
  );
};
