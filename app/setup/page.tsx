"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status, update } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      push("/setup/account/login");
    } else if (status === "authenticated") {
      console.log("user is authenticated");
    }
  }, [status, push]);
  return null;
}
