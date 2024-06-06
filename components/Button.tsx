import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  struct?: "fill" | "outline";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  struct = "fill",
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      // className={`${struct == "outline" ? "bg-white text-primary" : "bg-primary text-white"} px-4 py-2 border border-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg text-base font-medium leading-6 relative group flex items-center justify-center gap-2 ${className}`}
      className={cn(
        struct == "outline" ? "bg-white text-primary" : "bg-primary text-white",
        "px-4 py-2 border-transparent shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg text-base font-medium leading-6 relative group flex items-center justify-center gap-2",
        className
      )}
    >
      {children}

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary/20 transition duration-300 pointer-events-none opacity-0 group-hover:opacity-20 group-hover:pointer-events-auto"></div>
    </button>
  );
}
