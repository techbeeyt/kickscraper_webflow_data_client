import StepsContainer from "@/components/StepsContainer";
import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-6 bg-[#1B00DF] h-screen">
        <div className="w-full px-10 py-4">
          <div className="w-40 h-16 bg-white p-4 rounded-md border-[#d1d1d1]">
            <Image src="/images/logo.svg" alt="logo" width={140} height={72} />
          </div>
        </div>
        <StepsContainer />
      </div>
      <div className="col-span-6 bg-white h-screen">{children}</div>
    </main>
  );
};

export default layout;
