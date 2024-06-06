import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: 'https://api.kickscraper.com/api',
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

export const webflow = axios.create({
  baseURL: "https://api.webflow.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const cms = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: 'https://kickscraper-cms.onrender.com/api',
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});
