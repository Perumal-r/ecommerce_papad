import React from "react";
import CategoriesData from "./users/category";

const Page = () => {
  return (
    <div className="p-4 sm:ml-60">
      <div className=" rounded-lg dark:border-gray-700">
        <CategoriesData />
      </div>
    </div>
  );
};

export default Page;
