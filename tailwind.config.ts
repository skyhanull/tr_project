import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "px-1": "1px",
        "px-2": "2px",
        "px-3": "3px",
        "px-4": "4px",
        "px-5": "5px",
        "px-6": "6px",
        "px-7": "7px",
        "px-8": "8px",
        "px-9": "9px",
        "px-10": "10px",
        // 원하는 만큼 추가
      },
      inset: {
        "px-1": "1px",
        "px-2": "2px",
        "px-3": "3px",
        "px-4": "4px",
        "px-5": "5px",
        "px-6": "6px",
        "px-7": "7px",
        "px-8": "8px",
        "px-9": "9px",
        "px-55": "725px",
        // 원하는 만큼 추가
      },
      width: {
        "px-1": "1px",
        "px-2": "2px",
        "px-3": "3px",
        "px-4": "4px",
        "px-5": "5px",
        "px-6": "6px",
        "px-7": "7px",
        "px-8": "8px",
        "px-9": "9px",
        "px-55": "550px",
        // 원하는 만큼 추가
      },
      height: {
        "px-1": "1px",
        "px-2": "2px",
        "px-3": "3px",
        "px-4": "4px",
        "px-5": "5px",
        "px-6": "6px",
        "px-7": "7px",
        "px-8": "8px",
        "px-9": "9px",
        "px-10": "10px",
        // 원하는 만큼 추가
      },
    },
  },
  plugins: [],
};

export default config;
