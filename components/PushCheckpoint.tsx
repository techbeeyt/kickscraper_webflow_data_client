"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PushCheckpoint = () => {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const query = useSearchParams();
  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      push(
        `/setup/account/login${
          query.has("code") ? `?code=${query.get("code")}` : ""
        }`
      );
    } else if (status === "authenticated") {
      if (query.has("code")) {
        // TODO: do authorize the code

        /**
         * Authorize here
         */
        const checkpoint =
          localStorage.getItem("checkpoint") || "/setup/create_app";

        console.log(checkpoint);
        if (pathname !== checkpoint) {
          push(checkpoint);
        }
      } else {
        push("/setup/authorize_kickscraper");
      }
    }
  }, [status, pathname]);
  return null;
};

export default PushCheckpoint;
