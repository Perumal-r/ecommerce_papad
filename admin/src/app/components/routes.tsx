import Link from "next/link";
import React from "react";
import adminlogo from "../images/adminpapad.gif";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";

const Routes = () => {
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
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 focus:bg-green-600 focus:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <LuLayoutDashboard className="focus:bg-green-600 focus:text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/user"
                className="flex items-center p-2 text-gray-900 focus:bg-green-600 focus:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaRegUserCircle className="focus:bg-green-600 focus:text-white" />
                <span className="ms-3">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="flex items-center p-2 text-gray-900 focus:bg-green-600 focus:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineProductionQuantityLimits className="focus:bg-green-600 focus:text-white" />
                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/signin"
                className="flex items-center p-2 text-gray-900 focus:bg-green-600 focus:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiSignInBold className="focus:bg-green-600 focus:text-white" />
                <span className="ms-3">Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="flex items-center p-2 text-gray-900 focus:bg-green-600 focus:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CiLogout className="focus:bg-green-600 focus:text-white text-black" />
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
