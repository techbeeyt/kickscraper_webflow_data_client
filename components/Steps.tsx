import Image from "next/image";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  noNext?: boolean;
  title: string;
  description?: string;
  isCurrent?: boolean;
}

const Steps = ({
  icon,
  noNext = false,
  title,
  description,
  isCurrent = false,
}: Props) => {
  return (
    <div
      className={`flex justify-start ${
        description ? "items-start" : "items-center"
      } gap-4`}
    >
      <div
        className={`relative w-14 h-14 border ${
          isCurrent ? "bg-white border-white" : "border-white/85"
        } flex justify-center items-center rounded-lg`}
      >
        <div
          className={`w-6 h-6 ${
            isCurrent ? "text-[#1B00DF]" : "text-white/85"
          }`}
        >
          {icon}
        </div>
        {!noNext ? (
          <div className="w-[2px] h-12 absolute top-[109%] bg-[#d1d1d1]"></div>
        ) : null}
      </div>
      <div className="w-72">
        <h1
          className={`font-medium ${
            isCurrent ? "text-white" : "text-white/85"
          }`}
        >
          {title}
        </h1>
        <p
          className={`font-light ${isCurrent ? "text-white" : "text-white/85"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Steps;
