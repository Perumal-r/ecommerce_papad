// components/HeroBanner.tsx
"use client";

import Image from "next/image";
import images from "../app/images/heropage.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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
        <div className="absolute top-4 left-4 bg-green-700 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg z-20">
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
          Papad is a thin, crispy Indian snack or accompaniment, usually served
          with meals or as an appetizer. It is made from a dough of lentil flour
          commonly urad dal, salt, and spices, which is rolled into thin rounds
          and then sun-dried or oven-dried. Before serving, papads are either
          fried or roasted.
        </p>
        <button
          onClick={handleShopNowClick}
          className="bg-green-700 flex items-center hover:bg-green-600 text-white px-6 py-2 rounded font-semibold transition cursor-pointer"
        >
          Shop Now <MdKeyboardDoubleArrowRight className="ml-1 text-2xl" />
        </button>
      </div>
    </section>
  );
}
