import Hero from "../components/Hero";
import Features from "../components/Feature";
import NewArrivals from "../components/NewArrivals";
import Categories from "../components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Contact from "./contact/page";

export default function Home() {
  return (
    <>
      <div id="hero-section">
        <Hero />
      </div>
      <div id="categories-section">
        <Categories />
      </div>
      <div id="how-it-works-section">
        <HowItWorks />
      </div>
      <Features />
      <NewArrivals />
      <div id="contact-section">
        <Contact />
      </div>
    </>
  );
}
