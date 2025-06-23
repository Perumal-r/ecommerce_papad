"use client";

import {
  addToCartAPI,
  fetchCart,
  removeFromCartAPI,
  updateCartQuantityAPI,
} from "@/redux/slice/cartSlice";
import { closeDrawer, openDrawer } from "@/redux/slice/drawerSlice";
import { RootState } from "@/redux/store/store";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartShopping, FaEye } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiContractLeftLine, RiContractRightLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import emptyCard from "../app/images/empty_card.jpg";
import { fetchCategories } from "../redux/slice/categorySlice";
import { AppDispatch } from "../redux/store/store";
import Counter from "./counter/counter";
import ProductModal from "./ProductModal";

type CartItem = {
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  name?: string;
  imageUrl?: string;
  cart?: {
    quantity: number;
  };
};

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  vendor?: string;
  mfgDate?: string;
}

const useAppDispatch = () => useDispatch<AppDispatch>();

export default function Categories() {
  const [loginId, setLoginId] = useState<string | null>(null);
  const [userIds, setUserIds] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const router = useRouter();

  const handleView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleShopNowClick = () => {
    const target = document.getElementById("categories-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      dispatch(closeDrawer());
    }
  };

  const handleAddToCart = (item: CartItem) => {
    const token = loginId;

    if (!token) {
      router.push("/register");
    } else {
      dispatch(
        addToCartAPI({
          userId: userIds || "",
          productId: item.productId,
          quantity: 1,
        })
      ).then(() => {
        dispatch(openDrawer());
        dispatch(fetchCart(userIds));
      });
    }
  };

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item?.productId?.price * item?.quantity,
    0
  );

  const salesTax = subtotal * 0.1;

  useEffect(() => {
    dispatch(fetchCategories());
    const token = sessionStorage.getItem("token");
    const userId_send = window.sessionStorage.getItem("user");
    setUserIds(userId_send);
    setLoginId(token);
  }, [dispatch, loginId]);

  return (
    <section className="p-4 sm:p-6 md:p-8 relative">
      <div className="flex justify-center mb-6 md:mb-8">
        <Counter />
      </div>
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        All Categories
      </h2>

      <div className="relative">
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

        {/* <div ref={sliderRef} className="keen-slider px-4 py-6">
          {categories.map((cat) => (
            <div
              key={cat?._id}
              className="keen-slider__slide px-2" // small horizontal gap per slide
            >
              <div className="bg-white rounded-lg shadow hover:shadow-lg flex flex-col h-full min-h-[500px] p-6">
                <Image
                  src={cat?.imageUrl}
                  alt={cat?.name}
                  width={500}
                  height={300}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-4 font-bold text-lg">{cat.name}</h3>
                <p className="text-green-600 mb-4">{cat.description}</p>
                <p className="text-gray-600 text-md">
                  Price : &#8377; {cat.price}
                </p>
                <p className="text-gray-600 text-md mb-4">Free Delivery</p>

                <div className="mt-auto">
                  <button
                    onClick={() =>
                      handleAddToCart({
                        userId: userIds || "",
                        productId: cat._id || "",
                        price: cat.price || 0,
                        quantity: 1,
                      })
                    }
                    className="w-full px-4 py-2 flex items-center justify-center bg-green-700 text-white rounded hover:bg-green-600 transition cursor-pointer"
                  >
                    <FaCartShopping />
                    <span className="ml-2">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div ref={sliderRef} className="keen-slider px-4 py-6">
          {categories.map((cat) => (
            <div key={cat?._id} className="keen-slider__slide px-2">
              <div className="bg-white rounded-lg shadow hover:shadow-lg flex flex-col h-full min-h-[200px] p-6">
                {/* Image + Hover Overlay */}
                <div className="relative group">
                  {/* Image */}
                  <Image
                    src={cat?.imageUrl}
                    alt={cat?.name}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover rounded"
                  />

                  {/* Blur + dark overlay */}
                  <div className="absolute inset-0 bg-opacity-0 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    {/* Eye Icon */}
                    <button
                      className="text-white hover:text-green-400 transition cursor-pointer"
                      onClick={() => cat._id && handleView(cat as Product)}
                    >
                      <FaEye size={28} />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <h3 className="mt-4 font-bold text-lg">{cat.name}</h3>
                <p className="text-gray-600 text-md">Price : ₹ {cat.price}</p>
                <p className="text-gray-600 text-md mb-4">Free Delivery</p>

                {/* Add to Cart */}
                <div className="mt-auto">
                  <button
                    onClick={() =>
                      handleAddToCart({
                        userId: userIds || "",
                        productId: cat._id || "",
                        price: cat.price || 0,
                        quantity: 1,
                      })
                    }
                    className="w-full px-4 py-2 flex items-center justify-center bg-green-700 text-white rounded hover:bg-green-600 transition cursor-pointer"
                  >
                    <FaCartShopping />
                    <span className="ml-2">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={closeModal} />
      {/* Cart Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 p-6 transition-all duration-300 ease-in-out overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">
              Your Cart ({cartItems.length} items)
            </h2>
            <button onClick={() => dispatch(closeDrawer())}>
              <IoClose className="text-2xl text-gray-600 hover:text-black" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
              {/* Plus/Minus icons - decorative */}
              <div className="flex space-x-8 mb-6 text-gray-400">
                <Image
                  src={emptyCard}
                  alt="emptycard"
                  width={200}
                  height={200}
                />
              </div>

              {/* Main message */}
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Product
                </h3>
                <p className="text-gray-500">Go find the products you like</p>
              </div>

              {/* Empty cart message */}
              <div className="mb-2">
                <p className="text-lg text-gray-600">Your cart is empty</p>
              </div>

              {/* Shopping button */}

              <button
                onClick={handleShopNowClick}
                className=" bg-gray-600 px-5 py-1 cursor-pointer text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                GO TO SHOPPING
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item._id || index} className="flex gap-3 pb-3">
                    <Image
                      src={item?.productId?.imageUrl || "/dummy-image.jpg"}
                      alt={item?.productId?.name || "Product"}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item?.productId?.name}</h4>

                      <div className="mt-2 flex justify-between items-center">
                        {item?.productId?.price > 0 ? (
                          <>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (item?.quantity > 1) {
                                    dispatch(
                                      updateCartQuantityAPI({
                                        id: item._id,
                                        quantity: item.quantity - 1,
                                      })
                                    ).then(() => dispatch(fetchCart(userIds)));
                                  }
                                }}
                                className="bg-gray-200 px-2 py-1 rounded"
                              >
                                <FiMinus />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => {
                                  dispatch(
                                    updateCartQuantityAPI({
                                      id: item._id,
                                      quantity: item.quantity + 1,
                                    })
                                  ).then(() => dispatch(fetchCart(userIds)));
                                }}
                                className="bg-gray-200 px-2 py-1 rounded"
                              >
                                <IoMdAdd />
                              </button>
                            </div>
                            <div className="font-medium">
                              &#8377;
                              {(
                                item?.productId?.price * item?.quantity
                              ).toFixed(2)}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-green-600">FREE</div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        dispatch(removeFromCartAPI(item._id)).then(() =>
                          dispatch(fetchCart(userIds))
                        )
                      }
                      className="text-red-600 hover:text-red-700 mt-8"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="mt-6 border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    &#8377;{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax:</span>
                  <span className="font-medium">
                    &#8377;{salesTax.toFixed(2)}
                  </span>
                </div>
                {/* <div className="flex justify-between">
            <span>Coupon:</span>
            <span className="text-blue-500 cursor-pointer">Add Coupon</span>
          </div> */}
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Grand Total:</span>
                  <span>&#8377;{(subtotal + salesTax).toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Message */}
              <div className="text-green-600 text-sm mt-2">
                Congrats, you&apos;re eligible for Free Shipping.
              </div>

              {/* Checkout Button */}
              <Link href="/shoppingcart">
                <button className="w-full mt-4 bg-green-700 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer">
                  Check Out
                </button>
              </Link>
              <div className="flex items-center w-full  bg-white-100 mt-5">
                <h4 className="font-bold">Delivery Information:</h4>
              </div>
              <p>
                Standard Delivery is:
                <span className="text-dark font-bold">2-4 business days</span>
              </p>
              <p>
                Delivery Mode:
                <span className="text-dark font-bold">Cash On Delivery</span>
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
