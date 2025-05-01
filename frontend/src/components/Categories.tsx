"use client";

import { useEffect } from "react";
import { fetchCategories } from "../redux/slice/categorySlice";
import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { RiContractLeftLine, RiContractRightLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import Counter from "./counter/counter";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default function Categories() {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.2,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
    },
    loop: true,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-center mb-6 md:mb-8">
        <Counter />
      </div>
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Featured Categories
      </h2>

      <div className="relative">
        {/* Arrow buttons */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 text-white p-2 rounded-full shadow hover:bg-green-500"
        >
          <RiContractLeftLine />
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 text-white p-2 rounded-full shadow hover:bg-green-500"
        >
          <RiContractRightLine />
        </button>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider p-5">
          {categories.map((cat, index: number) => (
            <div
              key={index}
              className="keen-slider__slide bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col h-full"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-4 font-bold text-lg">{cat.name}</h3>
              <p className="text-green-600 mb-4">{cat.description}</p>
              <button className="mt-auto px-4 py-2 flex items-center justify-center bg-green-700 text-white rounded hover:bg-green-600 transition cursor-pointer">
                <FaCartShopping />
                <span className="ml-2">Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
