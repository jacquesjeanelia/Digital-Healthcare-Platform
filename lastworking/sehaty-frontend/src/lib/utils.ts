import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage only, default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Default to light mode
    return false;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", darkMode);
    
    // Save preference to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, setDarkMode, toggleDarkMode: () => setDarkMode(prev => !prev) };
};
