"use client";

import { PrimaryButton } from "./views/components/Button/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "./views/lib/helpers/routes";

const Home = () => {
  const router = useRouter();
  // const [checked, setChecked] = useState(true);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <CustomInputField type="text" />
      <CustomCheckboxInput
        label="I agree to the terms and conditions"
        name="terms"
        checked={checked}
        onChange={handleCheckboxChange}
      /> */}
      <div className="flex gap-2 items-center">
        <PrimaryButton
          title={"Sign In"}
          onClick={() => router.push(ROUTES.SIGNIN)}
        />
        <PrimaryButton
          title={"Sign Up"}
          onClick={() => router.push(ROUTES.SIGNUP)}
        />
      </div>
      {/* <CustomSelect name="custom" options={[]} />
      <CustomOtpInput onChange={console.log} value="" valueLength={4} /> */}
    </div>
  );
};

export default Home;
