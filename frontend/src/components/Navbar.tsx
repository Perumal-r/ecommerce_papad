import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";

export default function Navbar() {
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
      <div className="flex items-center space-x-4 mr-5">
        <button className="text-gray-600 hover:text-green-500 text-2xl">
          <TiShoppingCart />
        </button>
        <button className="text-gray-600 hover:text-green-500 text-2xl">
          <IoLogOut />
        </button>
      </div>
    </nav>
  );
}
