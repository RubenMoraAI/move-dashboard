import React from "react";

interface SidebarGroupTitleProps {
  title: string;
  isCollapsed: boolean;
  icon?: React.ElementType;
}

export const SidebarGroupTitle = ({
  title,
  isCollapsed,
  icon: Icon,
}: SidebarGroupTitleProps) => {
  if (isCollapsed) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 px-8 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
      {Icon && <Icon role="img" className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
      <span className="text-md text-gray-400 dark:text-gray-500">{title}</span>
    </div>
  );
};

export default SidebarGroupTitle;
