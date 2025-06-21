import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import logoIcon from "../app/images/logo_spp-removebg-preview.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-50 text-gray-300 pt-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Address */}
        <div>
          <Image
            src={logoIcon}
            alt="Logo"
            width={100}
            height={100}
            className="mb-4 w-40 h-40"
          />
        </div>
        {/* About / Pages */}
        <div className="ml-10">
          <h4 className="font-semibold text-black mb-2 ">SPP Papad</h4>
          <ul className="space-y-1 text-black">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div >
          <h4 className="font-semibold text-black mb-2">Follow Us</h4>
          <div className="flex flex-row items-start gap-2 text-lg text-black">
            <FaFacebook className="hover:text-green-600 cursor-pointer text" />
            <FaSquareInstagram className="hover:text-green-600 cursor-pointer" />
            <IoLogoWhatsapp className="hover:text-green-600 cursor-pointer" />
          </div>
          <p className="text-black mt-1">Follow us on social media for latest updates and offers.</p>
        </div>

        {/* Events */}
        <div>
          <h4 className="font-semibold text-black mb-2">Terms/Privacy</h4>
          <ul className="space-y-1 text-black">
            <li>
              {" "}
              <Link href="/privacy_policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms_conditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-semibold text-black mb-2">
          <p className="text-green-600">
            SPP Papad Factory
            <br />
            North Street, Annupanadi, Madurai - 625009
            <br />
            perumalavinash210@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-black text-gray-500 mt-8 mb-3 border-t border-gray-700 pt-4">
        <p>&copy; 2025-2030 SPP Papad Factory. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
