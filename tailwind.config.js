/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#06b6d4",
        
"secondary": "#04773a",
        
"accent": "#17c666",
        
"neutral": "#111827",
        
"base-100": "#FFFFFF",
        
"info": "#7ad2f5",
        
"success": "#26a686",
        
"warning": "#eebe20",
        
"error": "#dd442c",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};

