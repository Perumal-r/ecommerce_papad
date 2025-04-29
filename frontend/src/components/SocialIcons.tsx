import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className="flex space-x-4 text-xl mt-2">
      <a
        href="https://facebook.com/PerumalAvinash"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 transition"
      >
        <FaFacebook />
      </a>
      <a
        href="https://wa.me/9196369890217"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-600 transition"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://instagram.com/avinash_t_1302"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-600 transition"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
