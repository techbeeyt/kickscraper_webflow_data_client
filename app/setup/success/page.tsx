"use client";

import { http } from "@/lib/axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiOutlineClipboard, HiOutlineClipboardCheck } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";

const Page = () => {
  const [domain, setDomain] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const session = useSession();
  const getUser = async () => {
    const user = await http.get(`/user`, {
      headers: {
        "x-auth-token": (session as any)?.data.authToken,
      },
    });
    setSecretKey(user.data.user.secret_key);
  };

  useEffect(() => {
    const domain = sessionStorage.getItem("short-name");
    setDomain(domain as string);
    if (session.status === "authenticated") {
      getUser();
    }
  }, [session.data]);

  return (
    <div className="p-8 flex flex-col justify-center items-center h-full gap-4 bg-contain bg-top bg-no-repeat bg-[url('/images/backgrounds/login-page-pattern.png')] -translate-y-10">
      <h1 className="text-3xl text-blue-700">Congratulations!</h1>
      <p className="text-gray-700 text-center text-sm">
        Kickscraper is ready to use. Now you can return to your webflow
        designer.
      </p>
      <div className="w-full rounded-md border border-gray-300 overflow-hidden">
        <div className="bg-gray-200 text-gray-600 flex justify-between items-center px-4 py-2">
          <div className="text-sm font-medium">
            Copy Secret and Paste it into Webflow app
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(secretKey).then(() => {
                setIsCopied(true);
              });
            }}
          >
            {!isCopied ? (
              <HiOutlineClipboard size={18} />
            ) : (
              <HiOutlineClipboardCheck size={18} />
            )}
          </button>
        </div>
        <div className="bg-gray-100 text-gray-500 p-4">{secretKey}</div>
      </div>
      <a
        href={`https://${domain}.design.webflow.com`}
        className="bg-blue-700 text-white px-4 py-2 rounded flex justify-center items-center gap-2"
        target="_self"
      >
        Open Designer <MdOpenInNew />
      </a>
    </div>
  );
};

export default Page;
