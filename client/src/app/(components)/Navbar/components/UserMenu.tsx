import React, { useState } from "react";
import { ChevronDown, User, Phone,  LogOut } from "lucide-react";
import Image from "next/image";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* User Header */}
      <div
        className="flex min-w-36 items-center gap-3 cursor-pointer p-1 bg-white dark:bg-gray-700 shadow-md rounded-lg"
        onClick={toggleMenu}
      >
        <Image
          src="/profile.jpg"
          alt="user-avatar"
          width={64}
          height={64}
          className="rounded w-14 border-2 border-indigo-700"
        />
        <div>
          <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300">
            Thomas Anree
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Principal Ops</p>
        </div>
        <ChevronDown className="text-gray-500 dark:text-gray-300" size={20} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-56 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10">
          <ul className="py-2">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <User size={18} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                My Profile
              </span>
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Phone size={18} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                My Contacts
              </span>
            </li> 
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <LogOut size={18} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Log Out
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
