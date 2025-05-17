import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";
import { openDrawer } from "@/redux/slice/drawerSlice";
import {  useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { RootState } from "@/redux/store/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
export default function Navbar() {

  const cartItems = useSelector((state:RootState) => state.cart.items);
const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

   const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/register";
  };

  return (
    <nav className="flex items-center justify-between bg-green-50 py-4 shadow sticky top-0 z-50">
      <div className="text-2xl font-bold text-green-600 ml-5">SPP</div>
      <ul className="hidden md:flex space-x-6 text-gray-600">
        <li>
          <Link href="/" className="hover:text-green-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-green-500">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-green-500">
            Contact
          </Link>
        </li>
      </ul>
     <div className="flex items-center gap-4 mr-5">
  {/* Cart Button */}
  <div className="relative">
    <button 
      className="relative text-gray-600 hover:text-green-500 text-2xl cursor-pointer"
      onClick={() => dispatch(openDrawer())}
    >
      <TiShoppingCart />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </button>
  </div>

  {/* Logout Button */}
  <button 
    className="text-gray-600 hover:text-green-500 text-2xl cursor-pointer"
    onClick={handleLogout}
  >
    <IoLogOut />
  </button>
</div>

    </nav>
  );
}
