import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(url: string) {
  // Remove protocol (http://, https://) if present
  url = url.replace(/^(https?:\/\/)?/, "");

  // Remove subdomains and paths, leaving only the domain
  const domain = url.replace(/^www\./, "").split("/")[0];

  return domain;
}

export const isValidURL = (url: string) => {
  const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/;

  return urlPattern.test(url);
};

export const makeValidURL = (url: string) => {
  // Add "https://" if the URL doesn't start with "http://" or "https://"
  if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
    url = "https://" + url;
  }

  // Check if the URL is a subdomain URL (contains a dot before the domain)
  const domainIndex = url.indexOf("://") + 3;
  const domain = url.substring(domainIndex).split("/")[0];
  const isSubdomain = domain.split(".").length > 2;

  // Check if "www" is already present or if it's a subdomain URL
  if (!url.includes("www.") && !isSubdomain) {
    // Add "www." to the URL
    const protocolIndex = url.indexOf("://");
    const urlWithoutProtocol = url.substring(protocolIndex + 3);
    url = url.substring(0, protocolIndex + 3) + urlWithoutProtocol;
  }

  return url;
};

export const calculatePercentage = (count: number, total: number) => {
  return (count / total) * 100;
};

export function getRandomColor() {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Construct the CSS color string
  return `rgb(${r},${g},${b})`;
}
