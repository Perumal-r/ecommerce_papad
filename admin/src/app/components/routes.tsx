"use client";

import Link from "next/link";
import React from "react";
import adminlogo from "../images/logo_spp-removebg-preview.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaDatabase } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Routes = () => {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center p-2 rounded-lg group ${
      pathname === path
        ? "bg-green-600 text-white"
        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-10 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="px-3 flex items-center h-14 bg-gray-50 dark:bg-gray-800">
          <Image width={50} height={50} src={adminlogo} alt="Logo" />
          <span className="ml-1 text-2xl text-green-600 font-bold">SPP</span>
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className={linkClasses("/")}>
                <LuLayoutDashboard className="me-2" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/user" className={linkClasses("/user")}>
                <MdOutlineProductionQuantityLimits className="me-2" />

                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link href="/product" className={linkClasses("/product")}>
                <FaDatabase className="me-2"/>

                <span className="ms-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/signin" className={linkClasses("/signin")}>
                <PiSignInBold className="me-2" />
                <span className="ms-3">Sign In</span>
              </Link>
            </li>
            <li>
              <Link href="/signup" className={linkClasses("/signup")}>
                <CiLogout className="me-2" />
                <span className="ms-3">Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Routes;
