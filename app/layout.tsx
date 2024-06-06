import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
import { Toaster } from "@/components/ui/sonner";
import ProgressBarProvider from "@/components/providers/ProgressBarProvider";
import { webflow } from "@/lib/axios";
import LoadingScreenGlobal from "@/components/loadingScreenGlobal";

const { WEBFLOW_CLIENT_ID, WEBFLOW_SECRET_KEY } = process.env;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProviderWrapper>
          <ProgressBarProvider>{children}</ProgressBarProvider>
          <Toaster />
          <LoadingScreenGlobal />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
