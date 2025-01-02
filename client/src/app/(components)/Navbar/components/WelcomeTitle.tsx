import React from "react"; 


const WelcomeTitle  = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
        {getGreeting()}, Welcome back!
      </h1>
    </div>
  );
};

export default WelcomeTitle;
