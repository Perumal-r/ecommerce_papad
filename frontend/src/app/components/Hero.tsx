import Image from "next/image";
import heroImage from "../images/heropage.jpg";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-green-50 p-10">
      <div className="text-center md:text-left space-y-4">
        <p className="text-green-600 uppercase font-semibold">
          Discover 100% Papad
        </p>
        <h1 className="text-4xl font-bold">
          Tasty and Crispy Papad <br />{" "}
          <span className="text-green-600">Up to 25% Off</span>
        </h1>
      </div>
      <Image
        width={1000}
        height={1000}
        src={heroImage}
        alt="Dry Fruits"
        className="w-120 mt-6 md:mt-0 md:ml-8 rounded-full shadow-lg"
      />
    </section>
  );
}
