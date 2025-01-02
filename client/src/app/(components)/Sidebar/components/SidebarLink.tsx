"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isLocked?: boolean; 
}

export const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  isLocked = false,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    
    if (href === "/team-collaboration" || href === "/reports" || href === "/analytics") {
      e.preventDefault(); 
      router.push("/Premium"); 
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div
        className={`cursor-pointer flex items-center gap-3 transition-colors ${
          isCollapsed ? "justify-center py-4" : "justify-between px-8 py-4"
        } ${
          isActive
            ? "bg-indigo-200 text-gray-700 dark:text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-600"
            : "dark:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {!isCollapsed && <span className="font-medium">{label}</span>}
        </div> 
        {isLocked && !isCollapsed && (
          <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
    </Link>
  );
};

export default SidebarLink;
