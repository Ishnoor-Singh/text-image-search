import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IMAGES_BASE_URL } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getImageURLFromName(filename: string, imagesBaseURL = IMAGES_BASE_URL) {
  return `${imagesBaseURL}/${filename}`;
}
