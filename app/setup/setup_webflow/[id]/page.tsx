"use client";

import { getCustomDomains } from "@/actions/getWebflowData";
import BiTransfer from "@/components/icons/BiTransfer";
import { HiOutlineClipboard, HiOutlineClipboardCheck } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import SetupProgressItems from "@/components/ui/setup/setup-progress-items";
import { http } from "@/lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { RiLoader5Fill } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [progressFinished, setProgressFinished] = useState<
    { status: "success" | "failed" | "pending" | "info"; message: string }[]
  >([]);
  const [isVerifying, setIsVerifying] = useState(false);
  /**
   {
     success: 'success',
     message: "Application created successfully",
   }
   */

  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSetup = async () => {
    setIsLoading(true);
    // 1. get custom domain list
    setProgressMessage("Getting Your Site Domain Name...");
    setProgressFinished((prev) => [
      ...prev,
      {
        status: "pending",
        message: "Getting Your Site Domain Name...",
      },
    ]);
    const access_token = sessionStorage.getItem("access_token") as string;
    const domain = await getCustomDomains(id, access_token);
    setProgressMessage(`Got your domain: ${domain?.domain}`);
    sessionStorage.setItem("short-name", domain?.shortName);
    setProgressFinished((prev) => [
      ...prev,
      {
        status: "success",
        message: `Got your domain: ${domain?.domain}`,
      },
    ]);

    setProgressFinished((prev) => [
      ...prev,
      {
        status: "pending",
        message: `Creating a New Application..`,
      },
    ]);
    // 2. create new app in kickscraper
    let app;

    try {
      app = await http.post(
        "/user/app/create",
        {
          name: domain?.shortName,
          domain: domain?.domain,
        },
        {
          headers: {
            "x-auth-token": (session as any)?.data.authToken,
          },
        }
      );

      sessionStorage.setItem("applicationId", app.data.application._id);

      setProgressFinished((prev) => [
        ...prev,
        {
          status: "success",
          message: `Application created successfully.`,
        },
      ]);
    } catch (error) {
      console.log(error);

      setProgressMessage("");
      setProgressFinished((prev) => [
        ...prev,
        {
          status: "info",
          message: `You already have an app with this domain`,
        },
      ]);

      // Get the application key
      const _app = await http.get("/user/app/by_user", {
        headers: {
          "x-auth-token": (session as any)?.data.authToken,
        },
      });

      console.log(_app);

      app = _app.data.application.filter(
        (item: any) => item.domain === domain?.domain
      )[0];

      console.log(app);

      const _apiKey = await http.get(`/user/api/by_app/${app._id}`, {
        headers: {
          "x-auth-token": (session as any)?.data.authToken,
        },
      });

      const apiKey = _apiKey.data.apiKey[0].key;
      setApiKey(apiKey);
      setIsLoading(false);
      return;
    }

    setProgressMessage(`Creating API Key for the App..`);
    // 3. create api key for the app
    setProgressFinished((prev) => [
      ...prev,
      {
        status: "pending",
        message: `Creating API Key for the App..`,
      },
    ]);
    const api = await http.post(
      `/user/api/create/${app.data.application._id}`,
      {
        name: domain?.shortName,
        description: "Automatically created by the webflow app",
        type: "public",
        rate_limit: 1000,
        is_active: "yes",
      },
      {
        headers: {
          "x-auth-token": (session as any)?.data.authToken,
        },
      }
    );
    const api_key = api.data.apiKey.key;
    sessionStorage.setItem("api_key", api_key);
    setProgressFinished((prev) => [
      ...prev,
      {
        status: "success",
        message: `API Key created successfully.`,
      },
    ]);

    // 4. creating custom code
    setProgressFinished((prev) => [
      ...prev,
      {
        status: "pending",
        message: `Creating script for you...`,
      },
    ]);

    setProgressMessage(`Creating script for you...`);

    setApiKey(api_key);

    setProgressMessage(``);

    setProgressFinished((prev) => [
      ...prev,
      {
        status: "success",
        message: `Script created successfully.`,
      },
    ]);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
      <p className="font-medium">Setup Your Application</p>
      {apiKey ? null : (
        <>
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
            <Image
              src={"/images/webflow.svg"}
              alt="logo"
              width={36}
              height={36}
            />
          </div>
          <Button
            className="flex justify-center items-center gap-1 transition-all duration-150 ease-out"
            onClick={handleSetup}
            disabled={isLoading}
          >
            {isLoading ? "Setting up..." : "Setup"}
            <CiSettings
              size={18}
              className={`${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </>
      )}

      {apiKey ? null : (
        <div className="flex justify-center items-center">
          {isLoading ? (
            <div className="animate-spin h-4 w-4 rounded-full mr-3 border-t-2 border-gray-500" />
          ) : null}
          <span className="text-sm text-gray-600 h-4">{progressMessage}</span>
        </div>
      )}

      {apiKey ? (
        <div className="px-10 w-full">
          <h2 className="text-sm mb-1 text-gray-600">
            Step 1: Add the script to your website
          </h2>
          <div className="flex w-[98%] justify-between items-center gap-2 bg-gray-100 border border-gray-200 rounded-md overflow-hidden">
            <div className="w-[90%] text-sm text-gray-600 break-words p-2">
              <span className="text-[#990055]">{"<script "}</span>
              <span className="text-[#669900]">{" src"}</span>
              <span className="text-[#669900]">{'="'}</span>
              <span className="text-[#0077aa]">{`https://cdn.kickscraper.com/?kick_key=${apiKey}`}</span>
              <span className="text-[#669900]">{'">'}</span>
              <span className="text-[#990055]">{`</script>`}</span>
            </div>
            <div className="w-full border-l border-gray-300/80 bg-gray-200 text-gray-500 text-sm font-thin h-[100px] flex justify-center items-center">
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `<script src="https://cdn.kickscraper.com/?kick_key=${apiKey}"></script>`
                    )
                    .then(() => {
                      setCopied(true);
                    });
                }}
              >
                {!copied ? (
                  <HiOutlineClipboard size={18} />
                ) : (
                  <HiOutlineClipboardCheck size={18} />
                )}
              </button>
            </div>
          </div>

          <h2 className="mt-5 text-sm mb-1 text-gray-600">
            Step 2: Verify Your App
          </h2>
          <div className="flex justify-center items-center">
            <button
              // href="/setup/success"
              onClick={() => {
                setIsVerifying(true);
                let url = `https://cdn.kickscraper.com?kick_key=${apiKey}`;
                const newTab: any = window.open(
                  url,
                  "_blank",
                  "top=0,left=0,width=20,height=20"
                );

                setTimeout(() => {
                  newTab.close();
                  router.replace("/setup/success");
                }, 2000);
              }}
              disabled={isVerifying}
              className="bg-gray-800 px-3 py-2 rounded text-white text-sm hover:bg-gray-700 transition-all duration-300 ease-in font-medium flex justify-center items-center gap-2"
            >
              {isVerifying ? (
                <RiLoader5Fill size={16} className="animate-spin" />
              ) : (
                <MdOutlineVerifiedUser size={16} />
              )}
              <span>Verify Application</span>
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative w-full px-10 h-[160px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-white/0 z-10"></div>
        <div className="flex flex-col-reverse justify-center items-center gap-1 ">
          {progressFinished.map((item, index) => (
            <SetupProgressItems
              message={item.message}
              success={item.status}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
