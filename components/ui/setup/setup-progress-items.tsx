"use effect";

import Done from "@/components/icons/Done";
import Info from "@/components/icons/Info";
import Search from "@/components/icons/Search";
import React, { useEffect, useState } from "react";

const SetupProgressItems = ({
  message,
  success,
}: {
  message: string;
  success: "success" | "failed" | "pending" | "info";
}) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`flex justify-center items-center gap-1 ${
        animate ? "scale-100 opacity-100" : "scale-105 opacity-85"
      } transition-all duration-300 ease-in`}
    >
      {success === "info" ? (
        <>
          <span className="text-sm text-gray-500">
            <Info />
          </span>
          <span className="text-sm text-gray-500">{message}</span>
        </>
      ) : null}
      {success === "pending" ? (
        <>
          <span className="text-sm text-gray-600">
            <Search />
          </span>
          <span className="text-sm text-gray-600">{message}</span>
        </>
      ) : null}
      {success === "success" ? (
        <>
          <span className="text-sm text-green-600">
            <Done />
          </span>
          <span className="text-sm text-green-600">{message}</span>
        </>
      ) : null}
    </div>
  );
};

export default SetupProgressItems;
