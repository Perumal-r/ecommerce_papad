import React from "react";
import ProductIndex from "./products/product";

const Page = () => {
  return (
    <div className="p-4 sm:ml-60">
      <div className="rounded-lg dark:border-gray-700">
        <ProductIndex />
      </div>
    </div>
  );
};

export default Page;
