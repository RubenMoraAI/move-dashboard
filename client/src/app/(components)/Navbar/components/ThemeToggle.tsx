import React from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle = ({ isDarkMode, toggleDarkMode }: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 border-2 focus:outline-none border-indigo-500 flex items-center bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-300`}
    >
      <div
        className={`absolute w-6 h-6 rounded-full text-gray-200 dark:text-indigo-800 dark:bg-white bg-indigo-800 flex items-center justify-center transition-transform duration-300 shadow-md ${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {isDarkMode ? (
          <Moon role="img" size={16} />
        ) : (
          <Sun role="img" size={16} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
