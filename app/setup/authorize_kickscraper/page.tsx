import Authorize from "@/components/icons/Authorize";
import BiTransfer from "@/components/icons/BiTransfer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
      <p>Authorize Kickscraper from Webflow</p>
      <div className="flex justify-center items-center gap-3">
        <Image
          src={"/images/kickscrapper_k_only.svg"}
          alt="logo"
          width={36}
          height={36}
        />
        <div className="h-9 w-9">
          <BiTransfer />
        </div>
        <Image src={"/images/webflow.svg"} alt="logo" width={36} height={36} />
      </div>
      <Button className="flex justify-center items-center gap-3">
        Authorize
        <Authorize />
      </Button>
    </div>
  );
};

export default Page;
