import Image from "next/image";
import heroImage from "../app/images/heropage.jpg";
import Logo from "../app/images/logo_spp-removebg-preview.png";
import "../app/globals.css"; // Make sure clip-path CSS is included
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section className="w-full bg-green-50">
      {/* Mobile View */}
      <div className="flex flex-col items-center justify-center py-10 px-4 md:hidden">
        <div className="text-center space-y-4">
          <p className="text-green-600 uppercase font-semibold">
            Discover 100% Papad
          </p>
          <h1 className="text-4xl font-bold">
            Tasty and Crispy Papad <br />
            <span className="text-green-600">Up to 25% Off</span>
          </h1>
          <SocialIcons />
        </div>
        <Image
          width={300}
          height={300}
          src={heroImage}
          alt="Papad"
          className="mt-6 rounded-full bg-white"
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex relative w-full h-[500px] items-center overflow-hidden py-10 ">
        {/* Left Image with Right-Arrow Clip */}
        <div className="relative w-1/2 h-full clip-right-arrow overflow-hidden ">
          <Image
            src={heroImage}
            alt="Delicious food"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        {/* Right Content */}
        <div className="w-1/2 px-10 space-y-4 z-10 ">
          <Image
            src={Logo}
            alt="logo"
            width={500}
            height={500}
            className="w-25 h-25 rounded-full bg-white mb-6"
          />
          <h1 className="text-5xl font-bold text-green-600">SPP PAPAD</h1>
          <h2 className="text-2xl text-green-600">Sweet Memories</h2>
          <p className="text-gray-600">
            At <span className="font-bold">Sri Priya Papad</span>, we bring you
            a range of delicious, high-quality papads made from handpicked
            ingredients. Whether it&apos;s a family dinner or a festive feast,
            our papads add the perfect crunch to every bite. Enjoy traditional
            flavors with a modern twist &mdash; all crafted with care.
          </p>
          <p className="text-sm text-green-700">perumalavinash210@gmail.com</p>
          <SocialIcons />
        </div>
      </div>
    </section>
  );
}
