import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserInviteCard = () => {
  return (
    <Link href="rubenmora.dev" className="flex items-center bg-indigo-600 text-white rounded-full pl-2 pr-8 py-2 shadow-md space-x-3">
      {/* Initials Circle */}
      <div className="flex items-center justify-center bg-indigo-800 rounded-full w-10 h-10 text-lg font-bold">
        <Star fill="#fff"/>
      </div>
      {/* Text Content */}
      <div>
        <p className="text-sm font-medium">You have a special invitation!</p>
        <p className="text-md text-indigo-200">
        👍 Visit <span className="underline">rubenmora.dev</span> and Get in Touch! 
        </p>
      </div>
    </Link>
  );
};

export default UserInviteCard;
