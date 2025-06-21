import { openDrawer } from "@/redux/slice/drawerSlice";
import { RootState } from "@/redux/store/store";
import { IoLogOut } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLogin(!!token);
  }, []);
  
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/register";
  };

  const redirectToHero = () => {
    const target = document.getElementById("hero-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirectToAbout = () => {
    const target = document.getElementById("how-it-works-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirectToContact = () => {
    const target = document.getElementById("contact-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="flex items-center justify-between bg-green-50 py-4 shadow sticky top-0 z-50">
      <div className="text-2xl font-bold text-green-600 ml-5">SPP</div>
      <ul className="hidden md:flex space-x-6 text-gray-600">
        <li
          onClick={redirectToHero}
          className="hover:text-green-500 cursor-pointer"
        >
          Home
        </li>
        <li
          onClick={redirectToAbout}
          className=" hover:text-green-500 cursor-pointer"
        >
          About
        </li>
        <li
          onClick={redirectToContact}
          className="hover:text-green-500 cursor-pointer"
        >
          Contact
        </li>
      </ul>
      <div className="flex items-center gap-3 mr-5 cursor-pointer">
        {/* View Order Button */}
        {isLogin &&
        <button
          className="relative bg-transparent text-green-600 hover:text-green-500 text-sm md:text-base font-semibold px-4 py-2 border border-green-600 rounded"
        >
          <Link href="/orderproduct">
          View Order
          </Link>
        </button>}

        {/* Cart Icon (optional) */}
        <button
          className="text-green-600 hover:text-green-500 text-2xl cursor-pointer"
          onClick={() => dispatch(openDrawer())}
        >
          <TiShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Logout Button */}
        <button
          className="text-green-600 hover:text-green-500 text-2xl cursor-pointer"
          onClick={handleLogout}
        >
          <IoLogOut />
        </button>
      </div>
    </nav>
  );
}
