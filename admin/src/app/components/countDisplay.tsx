'use client'

import React from "react";
import { IoPerson } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useOrderContext } from "./context/orderContext";

const CountDisplay = () => {
const { orderStatus, orderDisplay } = useOrderContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-0 py-4 text-white">
      {/* Customers */}
      <div className="border border-teal-400 rounded-xl p-4 shadow-lg bg-white">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500 p-2 rounded-full text-white">
            <IoPerson />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">100</h2>
            <p className="text-sm text-black">Customers</p>
            <p className="text-xs text-black">
              <strong>100</strong> Active Customers
            </p>
          </div>
        </div>
      </div>

      {/* Employees */}
      <div className="border border-red-400 rounded-xl p-4 shadow-lg bg-white">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 p-2 rounded-full text-white">
            <GrUserWorker />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">6</h2>
            <p className="text-sm text-black">Employees</p>
            <p className="text-xs text-black">
              <strong>6</strong> Active Employees
            </p>
          </div>
        </div>
      </div>
      
      {/* Departments */}
      <div className="border border-green-400 rounded-xl p-4 shadow-lg bg-white">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <HiBuildingOffice2 />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">4</h2>
            <p className="text-sm text-black">Departments</p>
            <p className="text-xs text-black">
              <strong>4</strong> Total Departments
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="border border-yellow-400 rounded-xl p-4 shadow-lg bg-white">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-500 p-2 rounded-full text-white">
            <MdOutlineProductionQuantityLimits />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">{orderDisplay}</h2>
            <p className="text-sm text-black">Product Counts</p>
            <p className="text-xs text-black">
              <strong>{orderStatus.filter((item)=>item.status==="pending").length}</strong> Total Pending Count
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDisplay;
