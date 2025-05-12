import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FetchAPI = axios.create({
  baseURL: "http://netflix-api.dossware.com",
  headers: {
    accept: "application/json",
  },
});
