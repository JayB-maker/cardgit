"use client";

import React, { useState } from "react";
// import AboutYou from "../../views/components/WalkThroughComponent/AboutYou";
// import WhatYouDo from "../../views/components/WalkThroughComponent/WhatYouDo";
// import ContactInformation from "../../views/components/WalkThroughComponent/ContactInformation";
// import YourPhoto from "../../views/components/WalkThroughComponent/YourPhoto";
// import Successful from "../../views/components/WalkThroughComponent/Successful";
import dynamic from "next/dynamic";

const AboutYou = dynamic(
  () => import("../../views/components/WalkThroughComponent/AboutYou"),
  { ssr: false }
);
const WhatYouDo = dynamic(
  () => import("../../views/components/WalkThroughComponent/WhatYouDo"),
  { ssr: false }
);
const ContactInformation = dynamic(
  () =>
    import("../../views/components/WalkThroughComponent/ContactInformation"),
  { ssr: false }
);
const YourPhoto = dynamic(
  () => import("../../views/components/WalkThroughComponent/YourPhoto"),
  { ssr: false }
);
const Successful = dynamic(
  () => import("../../views/components/WalkThroughComponent/Successful"),
  { ssr: false }
);

const page = () => {
  const [setupStep, setSetupStep] = useState(1);
  const [details, setDetails] = useState<any>({});

  return (
    <>
      {setupStep === 1 && (
        <AboutYou
          setSetupStep={setSetupStep}
          setupStep={setupStep}
          details={details}
          setDetails={setDetails}
        />
      )}
      {setupStep === 2 && (
        <WhatYouDo
          setSetupStep={setSetupStep}
          setupStep={setupStep}
          details={details}
          setDetails={setDetails}
        />
      )}
      {setupStep === 3 && (
        <ContactInformation
          setSetupStep={setSetupStep}
          setupStep={setupStep}
          details={details}
          setDetails={setDetails}
        />
      )}
      {setupStep === 4 && (
        <YourPhoto
          setSetupStep={setSetupStep}
          setupStep={setupStep}
          details={details}
          setDetails={setDetails}
        />
      )}
      {setupStep === 5 && (
        <Successful
          setSetupStep={setSetupStep}
          setupStep={setupStep}
          details={details}
          setDetails={setDetails}
        />
      )}
    </>
  );
};

export default page;
