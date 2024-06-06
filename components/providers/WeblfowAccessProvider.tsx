"use client";

import { getAccessToken } from "@/lib/webflow_utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const WeblfowAccessProvider = ({ children }: { children: React.ReactNode }) => {
  const query = useSearchParams();
  useEffect(() => {
    (async () => {
      if (query.has("code")) {
        try {
          const access_key = await getAccessToken(query.get("code") as string);
          console.log(access_key);
        } catch (error) {
          console.log(error);
          toast.error("error");
        }
      }
    })();
  }, []);
  return <div>{children}</div>;
};

export default WeblfowAccessProvider;
