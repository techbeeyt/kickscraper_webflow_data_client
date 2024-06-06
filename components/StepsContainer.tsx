"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Steps from "./Steps";
import User from "./icons/User";
import Lock from "./icons/Lock";
import SetupKickscraper from "./icons/SetupKickscraper";
import SetupWebflow from "./icons/SetupWebflow";
import SetupSuccess from "./icons/SetupSuccess";
import useApplication from "@/hooks/useApplication";

const StepsContainer = () => {
  const pathname = usePathname();
  const steps = [
    pathname.startsWith("/setup/account") ||
      pathname.startsWith("/setup/setup_kickscraper_app") ||
      pathname.startsWith("/setup/setup_webflow") ||
      pathname.startsWith("/setup/success"),
    pathname.startsWith("/setup/setup_kickscraper_app") ||
      pathname.startsWith("/setup/setup_webflow") ||
      pathname.startsWith("/setup/success"),
    pathname.startsWith("/setup/setup_webflow") ||
      pathname.startsWith("/setup/success"),
    pathname.startsWith("/setup/success"),
  ];

  return (
    <div className="w-full p-4 text-white flex justify-start items-center flex-col gap-10 py-14">
      <Steps
        icon={<User />}
        title="Account Setup"
        description="You need to sign up or sign in to your kickscraper account."
        isCurrent={steps[0]}
      />

      <Steps
        icon={<SetupKickscraper />}
        title="Select Your Website"
        description="You need to select a website to setup a project on Kickscraper."
        isCurrent={steps[1]}
      />

      <Steps
        icon={<SetupWebflow />}
        title="Setup Webflow"
        description="Connect Kickscraper project with a Webflow project."
        isCurrent={steps[2]}
      />

      <Steps
        icon={<SetupSuccess />}
        title="Success"
        isCurrent={steps[3]}
        noNext
      />
    </div>
  );
};

export default StepsContainer;
