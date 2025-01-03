"use client";

import { useAppDispatch, useAppSelector } from "@/state/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu } from "lucide-react";
 
import React from "react";
import UserMenu from "./components/UserMenu";
import ThemeToggle from "./components/ThemeToggle";

import { Bell } from "lucide-react";
import WelcomeTitle from "./components/WelcomeTitle";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-indigo-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <WelcomeTitle />
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-indigo-100 bg-indigo-500 rounded-full">
              7
            </span>
            <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-indigo-400 opacity-70  animate-slowPing"></span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
