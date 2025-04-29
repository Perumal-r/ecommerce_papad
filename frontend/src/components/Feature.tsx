// components/HeroBanner.tsx
"use client";

import Image from "next/image";
import images from "../app/images/heropage.jpg";

export default function HeroBanner() {
  const handleShopNowClick = () => {
    const target = document.getElementById("categories-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-12 bg-white">
      {/* Left Image + Badge */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center">
        <div className="relative z-10">
          <Image
            src={images} // make sure to place this image inside public/fruits.png
            alt="Fresh Fruits"
            width={400}
            height={400}
            className="w-100 h-100 rounded-full"
          />
        </div>
        {/* Circle background */}
        <div className="absolute bg-green-600 rounded-full w-80 h-80 lg:w-[350px] lg:h-[350px] z-0"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg z-20">
          Up to 45% Off
        </div>
      </div>

      {/* Right Content */}
      <div className="text-center lg:text-left lg:w-1/2 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          Organic Papad Everyday
        </h1>
        <p className="text-green-600 font-semibold">
          Your online resource of healthy recipes.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          vulputate ultrices libero ut vehicula. In sit amet arcu libero. Proin
          fringilla dui sed arcu fringilla tristique eget ultricies elit.
        </p>
        <button
          onClick={handleShopNowClick}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
