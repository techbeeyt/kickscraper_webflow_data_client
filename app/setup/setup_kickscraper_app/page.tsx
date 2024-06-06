"use client";

import { listSites } from "@/actions/getWebflowData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { RiLoader5Fill } from "react-icons/ri";

const Page = () => {
  const [clickedNext, setClickedNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const getData = async () => {
    const access_token = sessionStorage.getItem("access_token") as string;
    const data = await listSites(access_token);
    setSites(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-start items-center gap-3 mb-4">
        <h1 className="text-lg font-medium font-sans">
          Select Your Webflow Site
        </h1>
        <button
          className={`${
            selectedId ? "bg-blue-600" : "bg-blue-600/60"
          } px-3 py-1.5 rounded text-white text-sm font-medium flex justify-center items-center gap-2`}
          onClick={() => {
            setClickedNext(true);
            if (selectedId) {
              router.push(`/setup/setup_webflow/${selectedId}`);
            }
          }}
        >
          Next{" "}
          {clickedNext ? (
            <RiLoader5Fill className="animate-spin" />
          ) : (
            <GrLinkNext />
          )}
        </button>
      </div>

      <div className="flex justify-start items-start gap-4 flex-wrap">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => {
            return (
              <div
                key={`sceleton-${i}`}
                className="h-64 w-64 bg-gray-200 border border-gray-300/80 rounded animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            );
          })}

        {!isLoading &&
          sites.map((item: any) => {
            return (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedId((prev) => {
                    if (prev === item.id) {
                      return "";
                    }
                    return item.id;
                  })
                }
                className={`w-64 h-64 relative bg-gray-50 p-4 border border-gray-100 rounded ${
                  selectedId === item.id ? "ring-2" : "hover:ring-2"
                } ring-blue-600 cursor-pointer`}
              >
                <Image
                  src={item.previewUrl}
                  className="h-40 w-auto border border-gray-100 rounded"
                  alt={item.displayName}
                  width={300}
                  height={240}
                />
                <h1 className="font-medium mt-2">{item.displayName}</h1>
                <h3 className="text-sm">{item.shortName}</h3>

                {selectedId === item.id ? (
                  <div className="absolute inset-0 bg-blue-100/50 z-20 text-gray-700 p-4">
                    <FaCheckCircle />
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
