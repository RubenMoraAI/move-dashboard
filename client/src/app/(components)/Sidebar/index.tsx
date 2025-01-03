'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useAppDispatch,
  useAppSelector,
} from '@/state/redux';
import { setIsSidebarCollapsed } from '@/state';
import {
  Archive,
  Clipboard,
  Layout,
  Menu,
  User,
  Users,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  Gem,
  Home,
} from 'lucide-react';
import SidebarLink from './components/SidebarLink';
import SidebarGroupTitle from './components/SidebarGroupTitle';

const sidebarItems = [
  {
    group: 'Main Menu',
    icon: Home,
    links: [
      { href: '/dashboard', icon: Layout, label: 'Dashboard', isLocked: false },
      { href: '/inventory', icon: Archive, label: 'Inventory', isLocked: false },
      { href: '/products', icon: Clipboard, label: 'Products', isLocked: false },
      { href: '/users', icon: User, label: 'Users', isLocked: false },
    ],
  },
  {
    group: 'Premium Features',
    icon: Gem,
    links: [
      { href: '/analytics', icon: TrendingUp, label: 'AI Analytics', isLocked: true },
      { href: '/reports', icon: ClipboardCheck, label: 'Custom Reports', isLocked: true },
      { href: '/team-collaboration', icon: Users, label: 'Team Collaboration', isLocked: true },
    ],
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed md:sticky h-screen top-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-800 transition-all duration-300 overflow-y-auto  shadow-md  ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72"
  } `;
  
  return (
    <div className={sidebarClassNames} data-testid="sidebar">
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-start items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'
          }`}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded w-16 dark:bg-white"
        />
        <h1
          className={`uppercase ${isSidebarCollapsed ? 'hidden' : 'block'
            } font-extrabold text-xl`}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>

        <button
            className={`md:hidden px-3 py-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-indigo-100 transition-all duration-300 ${
              isSidebarCollapsed ? 'hidden' : 'block'
            }`}
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {sidebarItems.map((group, idx) => (
          <React.Fragment key={idx}>
            <SidebarGroupTitle
              icon={group.icon}
              title={group.group}
              isCollapsed={isSidebarCollapsed}
            />
            {group.links.map((link, linkIdx) => (
              <SidebarLink
                key={linkIdx}
                href={link.href}
                icon={link.icon}
                label={link.label}
                isCollapsed={isSidebarCollapsed}
                isLocked={link.isLocked}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* DOCUMENTATION CARD */}
      {!isSidebarCollapsed && (
        <div className="px-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <BookOpen className="text-indigo-500 w-6 h-6 mr-3" />
              <p className="text-gray-800 dark:text-gray-300 font-semibold">
                Need help?
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Please check our docs.
            </p>
            <Link
              href="/Premium"
              className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md font-medium"
            >
              Documentation
            </Link>
          </div>
        </div>
      )}

      {/* FOOTER */}
      {!isSidebarCollapsed && (
        <div className="mb-6 px-4">
          <Link
            href="/Premium"
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg hover:scale-105 transition transform"
          >
            <Gem className="w-6 h-6" />
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
