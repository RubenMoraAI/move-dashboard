"use client";

import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <Loader className="animate-spin text-indigo-500 dark:text-indigo-300 mx-auto mb-4" size={40} />
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
